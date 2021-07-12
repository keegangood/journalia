import { useEffect, useState } from "react";

export const useScrollTop = (targetElement) => {
  
  const [scrollPositionY, setScrollPositionY] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      if (targetElement) {
        setScrollPositionY(document.body.getBoundingClientRect().top);
      }
    };

    window.addEventListener("scroll", scrollHandler);


    return () => window.removeEventListener("scroll", scrollHandler);
  },[targetElement]);

  return scrollPositionY;
};
