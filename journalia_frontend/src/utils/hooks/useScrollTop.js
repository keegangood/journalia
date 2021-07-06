import { useEffect, useState } from "react";

export const useScrollTop = (targetElement) => {
  
  const [scrollPositionY, setScrollPositionY] = useState(null);

  useEffect(() => {
    const scrollHandler = () => {
      console.log('scrollY', scrollPositionY)
      if (targetElement) {
        setScrollPositionY(document.body.getBoundingClientRect().top);

      }
    };

    window.addEventListener("scroll", scrollHandler);


    return () => window.removeEventListener("scroll", scrollHandler);
  });

  return scrollPositionY;
};
