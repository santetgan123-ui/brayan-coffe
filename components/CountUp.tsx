"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
};

export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1400,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const tick = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const progress = Math.min(1, (time - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [duration, isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
