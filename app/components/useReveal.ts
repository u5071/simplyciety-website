"use client";

import { useEffect } from "react";

/** Adds `in-view` to [data-reveal] and .gold-line elements as they scroll into view. */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }),
      { threshold: 0.07, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll("[data-reveal], .gold-line").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
