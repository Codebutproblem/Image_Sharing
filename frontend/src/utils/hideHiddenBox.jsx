import { useEffect } from "react";

const hideHiddenBoxListener = (state, setState, buttonId, hiddenBoxId) => {
  const handleClickOutside = (e) => {
    if (
      !document.getElementById(hiddenBoxId).contains(e.target) &&
      !document.getElementById(buttonId).contains(e.target)
    ) {
      setState(false);
    }
  };

  useEffect(() => {
    if (state) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
};

export default hideHiddenBoxListener;
