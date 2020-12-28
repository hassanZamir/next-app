import { useState, useEffect } from 'react';

const useModal = (ref: any, onCloseModal?: any) => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
    if (isShowing) {
      onCloseModal && onCloseModal();
    }
  }

  const handleClick = (e: any) => {
    if (ref.current && 
      !ref.current.contains(e.target) && 
      e.target.className === 'modal-wrapper'
    ) {
      // console.log("handle caskda");
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