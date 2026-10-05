"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveals its children line by line (each child = one line) when they enter the viewport.
 * Never hides content by default: lines are only "armed" after JS has measured them
 * below the fold, and reduced motion skips the effect entirely.
 */
export function Lines({ as: Tag = "div", id, children, className = "", stagger = 90 }: { as?: ElementType; id?: string; children: ReactNode[]; className?: string; stagger?: number }) {
  const Item: ElementType = Tag === "ul" || Tag === "ol" ? "li" : "span";
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    const safety = window.setTimeout(() => setState("in"), 8000);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <Tag ref={ref} id={id} className={`st-lines ${state} ${className}`}>
      {children.map((c, i) => (
        <Item key={i} className="st-line" style={{ transitionDelay: `${i * stagger}ms` }}>
          <span>{c}</span>
        </Item>
      ))}
    </Tag>
  );
}
