import { useLayoutEffect } from "react";

export default function useLockBodyScroll(active = true) {
  useLayoutEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;

    // Blocca scroll su tutti i browser (desktop + mobile)
    const html = document.documentElement;

    html.style.position = "fixed";
    html.style.top = `-${scrollY}px`;
    html.style.left = "0";
    html.style.right = "0";
    html.style.width = "100%";

    return () => {
      // Ripristina lo scroll precedente
      const top = html.style.top;

      html.style.position = "";
      html.style.top = "";
      html.style.left = "";
      html.style.right = "";
      html.style.width = "";

      window.scrollTo(0, parseInt(top || "0") * -1);
    };
  }, [active]);
}
