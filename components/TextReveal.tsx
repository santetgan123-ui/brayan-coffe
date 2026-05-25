"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type TextRevealProps = {
  text: string;
  className?: string;
};

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const characters = Array.from(text);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.32"],
  });

  return (
    <p ref={ref} aria-label={text} className={className}>
      {characters.map((character, index) => (
        <RevealCharacter
          key={`${character}-${index}`}
          character={character}
          index={index}
          total={characters.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function RevealCharacter({
  character,
  index,
  total,
  progress,
}: {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = Math.min(0.86, (index / Math.max(1, total)) * 0.86);
  const end = Math.min(1, start + 0.14);
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(247, 234, 210, 0.22)", "rgb(247, 234, 210)"],
  );

  if (character === " ") {
    return <span aria-hidden="true" className="inline-block w-[0.26em]" />;
  }

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity, y, color }}
      className="inline-block will-change-transform"
    >
      {character}
    </motion.span>
  );
}
