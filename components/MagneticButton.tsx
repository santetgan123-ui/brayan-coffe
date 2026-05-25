"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

export default function MagneticButton({
  children,
  href = "#craft",
  className = "",
}: MagneticButtonProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.35 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.35 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.18);
    y.set(offsetY * 0.22);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`group relative inline-flex h-16 min-w-52 items-center justify-center overflow-hidden rounded-full border border-brayan-cream/25 bg-brayan-cream px-8 text-sm font-semibold uppercase text-brayan-bg shadow-glow transition-colors duration-500 hover:border-brayan-copper hover:text-brayan-cream ${className}`}
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-brayan-copper transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 ml-4 h-2 w-2 rounded-full bg-current transition-transform duration-500 group-hover:scale-150" />
    </motion.a>
  );
}
