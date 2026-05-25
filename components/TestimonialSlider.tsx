"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const slides = [
  {
    quote:
      "Brayan Coffe feels designed, not blended. Every pour has a cinematic start, middle, and finish.",
    name: "Mara Voss",
    title: "Head Barista, Studio Nine",
    image: "/sequence/ezgif-frame-064.jpg",
  },
  {
    quote:
      "It is rare to find a roast that gives espresso this much weight without losing lift.",
    name: "Evan Kaito",
    title: "Coffee Program Director",
    image: "/sequence/ezgif-frame-122.jpg",
  },
  {
    quote:
      "The profile is dark, clean, and architectural. Our guests remember it after one cup.",
    name: "Lina Harper",
    title: "Founder, Dusk Room",
    image: "/sequence/ezgif-frame-188.jpg",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <section
      id="voices"
      className="relative min-h-screen overflow-hidden bg-brayan-edge text-brayan-cream"
      aria-label="Customer testimonials"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.name}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover opacity-[0.42]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,6,2,0.92),rgba(11,6,2,0.36),rgba(11,6,2,0.86))]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-screen items-center px-6 py-28 sm:px-12 lg:px-24">
        <div className="w-full">
          <div className="mb-12 flex items-center justify-between border-b border-brayan-cream/12 pb-5 text-xs uppercase text-brayan-mist/65">
            <span>Voices</span>
            <span>{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.quote}
              initial={{ y: 44, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -34, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="max-w-6xl"
            >
              <p className="text-[clamp(2.4rem,7vw,7.75rem)] font-semibold leading-[0.98]">
                {slide.quote}
              </p>
              <div className="mt-12 flex flex-col gap-2 text-sm uppercase text-brayan-mist sm:flex-row sm:items-end sm:gap-6">
                <span className="text-brayan-cream">{slide.name}</span>
                <span>{slide.title}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-3">
            {slides.map((item, itemIndex) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial ${itemIndex + 1}`}
                onClick={() => setIndex(itemIndex)}
                className="h-1 overflow-hidden rounded-full bg-brayan-cream/16"
              >
                <motion.span
                  className="block h-full origin-left bg-brayan-copper"
                  animate={{ scaleX: itemIndex === index ? 1 : 0 }}
                  transition={{ duration: itemIndex === index ? 5.2 : 0.35, ease: "linear" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
