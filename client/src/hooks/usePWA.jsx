// hooks/usePWAMobile.js
import { useEffect, useState } from "react";

export const usePWAMobile = () => {
  const [isPWAMobile, setIsPWAMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                        || window.navigator.standalone === true;
      const isMobile = window.innerWidth < 768;
      setIsPWAMobile(isStandalone && isMobile);
    };

    check(); // on mount
    window.addEventListener("resize", check); // re-check on resize

    return () => window.removeEventListener("resize", check);
  }, []);

  return isPWAMobile;
};
