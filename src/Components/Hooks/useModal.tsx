import { useState, useEffect } from 'react';

const useModal = (ref: any, onCloseModal?: any) => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  const handleClick = (e: any) => {
    if (ref.current && 
      !ref.current.contains(e.target) && 
      e.target.className === 'modal-wrapper'
    ) {
      onCloseModal && onCloseModal();
      toggle();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return {
    isShowing,
    toggle,
  }
};

export { useModal };