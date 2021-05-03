import { useState } from "react";

export const useModal = (defaultState = false) => {
  const [isShowing, setIsShowing] = useState(defaultState);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggle,
  };
};
