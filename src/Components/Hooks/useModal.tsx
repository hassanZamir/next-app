import { useState, useEffect } from 'react';

const useModal = (ref: any) => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  const handleClick = (e: any) => {
    console.log(ref.current);
    if (ref.current && !ref.current.contains(e.target)) {
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