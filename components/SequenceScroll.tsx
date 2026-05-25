"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

const START_FRAME = 75;
const END_FRAME = 240;
const FRAME_COUNT = END_FRAME - START_FRAME + 1;
const SCROLL_SPEED_MULTIPLIER = 1.28;
const SEQUENCE_BG = "#0b0602";

const vibeChapters = [
  {
    from: 0,
    to: 0.24,
    tag: "Babak 01",
    title: "Midnight Bloom",
    subtitle: "Warm neon, pelan, dan misterius.",
    overlay:
      "linear-gradient(140deg, rgba(11,6,2,0.68), rgba(62,25,10,0.32), rgba(11,6,2,0.62))",
  },
  {
    from: 0.24,
    to: 0.5,
    tag: "Babak 02",
    title: "Copper Pulse",
    subtitle: "Energi naik saat gerak frame makin agresif.",
    overlay:
      "linear-gradient(130deg, rgba(23,10,3,0.66), rgba(126,56,18,0.3), rgba(11,6,2,0.64))",
  },
  {
    from: 0.5,
    to: 0.76,
    tag: "Babak 03",
    title: "Velvet Drift",
    subtitle: "Lebih lembut, halus, dan dalam.",
    overlay:
      "linear-gradient(125deg, rgba(11,6,2,0.72), rgba(57,33,22,0.28), rgba(11,6,2,0.64))",
  },
  {
    from: 0.76,
    to: 1,
    tag: "Babak 04",
    title: "Final Pour",
    subtitle: "Kontras tinggi untuk penutup yang bold.",
    overlay:
      "linear-gradient(130deg, rgba(11,6,2,0.76), rgba(200,137,59,0.22), rgba(11,6,2,0.68))",
  },
];

const frameSrc = (frame: number) =>
  `/sequence/ezgif-frame-${String(frame).padStart(3, "0")}.jpg`;

const clampFrame = (frame: number) => Math.min(END_FRAME, Math.max(START_FRAME, frame));

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const activeFrameRef = useRef(START_FRAME);
  const previousFrameRef = useRef(START_FRAME);
  const previousTimestampRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(START_FRAME);
  const [kineticLevel, setKineticLevel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.18,
  });

  const acceleratedProgress = useTransform(smoothProgress, (value) =>
    Math.min(1, Math.max(0, value * SCROLL_SPEED_MULTIPLIER)),
  );

  const frameValue = useTransform(
    acceleratedProgress,
    [0, 0.92, 1],
    [START_FRAME, END_FRAME, END_FRAME],
  );
  const titleOpacity = useTransform(acceleratedProgress, [0, 0.15, 0.24], [1, 1, 0]);
  const titleY = useTransform(acceleratedProgress, [0, 0.24], [0, -58]);
  const leftOpacity = useTransform(acceleratedProgress, [0.19, 0.3, 0.42], [0, 1, 0]);
  const leftY = useTransform(acceleratedProgress, [0.19, 0.3, 0.42], [54, 0, -54]);
  const rightOpacity = useTransform(acceleratedProgress, [0.49, 0.6, 0.72], [0, 1, 0]);
  const rightY = useTransform(acceleratedProgress, [0.49, 0.6, 0.72], [54, 0, -54]);
  const ctaOpacity = useTransform(acceleratedProgress, [0.78, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(acceleratedProgress, [0.78, 0.9, 1], [64, 0, -12]);
  const progressWidth = useTransform(acceleratedProgress, [0, 1], ["0%", "100%"]);
  const hudOpacity = useTransform(acceleratedProgress, [0, 0.1, 0.18, 0.92, 1], [0, 0, 1, 1, 0]);

  const drawFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[clampFrame(frame) - START_FRAME];

    if (!canvas || !image || !image.complete || !image.naturalWidth) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const isUpscaled = image.naturalWidth < rect.width * 0.95 || image.naturalHeight < rect.height * 0.95;
    context.imageSmoothingEnabled = !isUpscaled;
    context.imageSmoothingQuality = isUpscaled ? "medium" : "high";
    context.fillStyle = SEQUENCE_BG;
    context.fillRect(0, 0, rect.width, rect.height);

    const frameProgress = (frame - START_FRAME) / (FRAME_COUNT - 1);
    const pointer = pointerRef.current;
    const velocity = Math.max(-1.4, Math.min(1.4, scrollVelocityRef.current * 28));
    const velocityAbs = Math.min(1, Math.abs(velocity));

    const baseScale = Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
    const cinematicZoom = 1.03 + Math.sin(frameProgress * Math.PI) * 0.08 + velocityAbs * 0.03;
    const drawWidth = image.naturalWidth * baseScale * cinematicZoom;
    const drawHeight = image.naturalHeight * baseScale * cinematicZoom;
    const orbitX = Math.sin(frameProgress * Math.PI * 3) * 18;
    const orbitY = Math.cos(frameProgress * Math.PI * 2) * 10;
    const parallaxX = pointer.x * 26 + velocity * 28 + orbitX;
    const parallaxY = pointer.y * 19 + orbitY;
    const x = (rect.width - drawWidth) / 2 + parallaxX;
    const y = (rect.height - drawHeight) / 2 + parallaxY;

    context.save();
    context.filter = `blur(${22 + velocityAbs * 9}px) saturate(${1.22 + velocityAbs * 0.08}) brightness(0.74)`;
    context.globalAlpha = 0.28;
    context.drawImage(
      image,
      x - parallaxX * 0.8,
      y - parallaxY * 0.8,
      drawWidth * 1.06,
      drawHeight * 1.06,
    );
    context.restore();

    if (velocityAbs > 0.03) {
      context.save();
      context.globalAlpha = 0.06 + velocityAbs * 0.13;
      context.filter = `blur(${6 + velocityAbs * 6}px)`;
      context.translate(velocity * 10, 0);
      context.drawImage(image, x, y, drawWidth, drawHeight);
      context.restore();
    }

    context.save();
    context.filter = "contrast(1.08) saturate(1.1)";
    context.drawImage(image, x, y, drawWidth, drawHeight);
    context.restore();

    if (isUpscaled) {
      context.save();
      context.globalCompositeOperation = "overlay";
      context.globalAlpha = 0.14;
      context.filter = "contrast(1.3)";
      context.drawImage(image, x - 0.8, y - 0.8, drawWidth + 1.6, drawHeight + 1.6);
      context.restore();
    }

    const vignette = context.createRadialGradient(
      rect.width / 2,
      rect.height / 2,
      rect.height * 0.2,
      rect.width / 2,
      rect.height / 2,
      rect.width * 0.8,
    );
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.66)");
    context.fillStyle = vignette;
    context.fillRect(0, 0, rect.width, rect.height);

    const light = context.createLinearGradient(0, 0, rect.width, rect.height * 0.8);
    light.addColorStop(0, "rgba(247, 234, 210, 0.11)");
    light.addColorStop(0.36, `rgba(200, 137, 59, ${0.09 + velocityAbs * 0.09})`);
    light.addColorStop(1, "rgba(11, 6, 2, 0)");
    context.fillStyle = light;
    context.fillRect(0, 0, rect.width, rect.height);

    context.save();
    context.globalAlpha = 0.07;
    context.fillStyle = "rgba(247, 234, 210, 0.22)";
    for (let i = 0; i < 22; i += 1) {
      const grainX = ((frame * 17 + i * 53) % rect.width) + velocity * 8;
      const grainY = ((frame * 23 + i * 41) % rect.height) + pointer.y * 8;
      context.fillRect(grainX, grainY, 1.2, 1.2);
    }
    context.restore();
  }, []);

  const scheduleDraw = useCallback(
    (frame: number) => {
      activeFrameRef.current = clampFrame(Math.round(frame));

      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        drawFrame(activeFrameRef.current);
        setCurrentFrame(activeFrameRef.current);
      });
    },
    [drawFrame],
  );

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images = Array.from({ length: FRAME_COUNT }, () => new Image());
    imagesRef.current = images;

    const markLoaded = () => {
      if (cancelled) {
        return;
      }

      loadedCount += 1;
      setLoaded(loadedCount);

      if (loadedCount === FRAME_COUNT) {
        setReady(true);
        scheduleDraw(activeFrameRef.current);
      }
    };

    images.forEach((image, index) => {
      let counted = false;
      const markOnce = () => {
        if (counted) {
          return;
        }

        counted = true;
        markLoaded();
      };

      image.decoding = "async";
      image.loading = "eager";
      image.onload = markOnce;
      image.onerror = markOnce;
      image.src = frameSrc(START_FRAME + index);

      if (image.complete) {
        markOnce();
      }
    });

    return () => {
      cancelled = true;
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scheduleDraw]);

  useEffect(() => {
    const handleResize = () => scheduleDraw(activeFrameRef.current);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [scheduleDraw]);

  useEffect(() => {
    if (ready) {
      scheduleDraw(START_FRAME);
    }
  }, [ready, scheduleDraw]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      pointerRef.current = { x, y };
      scheduleDraw(activeFrameRef.current);
    };

    const handlePointerLeave = () => {
      pointerRef.current = { x: 0, y: 0 };
      scheduleDraw(activeFrameRef.current);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [scheduleDraw]);

  useMotionValueEvent(frameValue, "change", (latest) => {
    if (ready) {
      const now = performance.now();
      const deltaFrame = latest - previousFrameRef.current;
      const deltaTime = Math.max(16, now - previousTimestampRef.current);
      const instantaneousVelocity = deltaFrame / deltaTime;
      scrollVelocityRef.current = scrollVelocityRef.current * 0.8 + instantaneousVelocity * 0.2;
      setKineticLevel(Math.min(1, Math.abs(scrollVelocityRef.current) * 26));
      previousFrameRef.current = latest;
      previousTimestampRef.current = now;
      scheduleDraw(latest);
    }
  });

  const percentage = Math.min(100, Math.round((loaded / FRAME_COUNT) * 100));
  const sequenceProgress = Math.round(((currentFrame - START_FRAME) / (FRAME_COUNT - 1)) * 100);
  const sequenceRatio = Math.min(1, Math.max(0, (currentFrame - START_FRAME) / (FRAME_COUNT - 1)));
  const activeVibe =
    vibeChapters.find((chapter) => sequenceRatio >= chapter.from && sequenceRatio <= chapter.to) ??
    vibeChapters[vibeChapters.length - 1];

  return (
    <section
      ref={containerRef}
      className="relative h-[280vh] overflow-clip bg-[var(--brayan-bg)] text-brayan-cream md:h-[320vh]"
      aria-label="Brayan Coffee cinematic roast sequence"
    >
      <AnimatePresence>
        {!ready ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.19, 1, 0.22, 1] } }}
            className="preloader-grid fixed inset-0 z-[90] flex items-center justify-center bg-[var(--brayan-bg)]"
          >
            <div className="w-full min-w-[min(28rem,82vw)]">
              <div className="mb-6 flex items-end justify-between text-brayan-cream">
                <p className="text-xs font-semibold uppercase text-brayan-mist/70">
                  Loading roast frames
                </p>
                <p className="text-7xl font-semibold leading-none sm:text-8xl">{percentage}</p>
              </div>
              <div className="h-px overflow-hidden bg-brayan-cream/15">
                <motion.div
                  className="h-full bg-brayan-copper"
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </div>
              <div className="mt-5 flex justify-between text-[0.65rem] uppercase text-brayan-mist/55">
                <span>Brayan Coffee</span>
                <span>
                  {FRAME_COUNT} frames ({START_FRAME}-{END_FRAME})
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-screen w-full bg-[var(--brayan-bg)]"
          aria-hidden="true"
        />
        <div className="sequence-vignette pointer-events-none absolute inset-0 z-[1]" />
        <motion.div
          className="sequence-specular pointer-events-none absolute inset-0 z-[2]"
          style={{ opacity: 0.72 + kineticLevel * 0.28 }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVibe.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            className="pointer-events-none absolute inset-0 z-[3]"
            style={{ backgroundImage: activeVibe.overlay }}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-10">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-0 flex items-center justify-center px-6 text-center"
          >
            <div className="max-w-5xl">
              <p className="mb-5 text-xs font-semibold uppercase text-brayan-mist/80 sm:text-sm">
                Small-batch kinetic roast
              </p>
              <h1 className="text-[clamp(4.5rem,16vw,12rem)] font-bold leading-[0.84] text-brayan-cream">
                Brayan Coffee
              </h1>
              <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-brayan-mist sm:text-lg">
                A darker specialty ritual built from cinematic roast curves, quiet precision, and
                the first warm note after midnight.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: leftOpacity, y: leftY }}
            className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-24"
          >
            <div className="max-w-[28rem] text-left">
              <p className="mb-5 text-xs font-semibold uppercase text-brayan-copper">
                30 percent extraction
              </p>
              <h2 className="text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9]">
                Smoke folds into velvet.
              </h2>
              <p className="mt-7 max-w-sm text-base leading-7 text-brayan-mist">
                Dense crema, cacao depth, and a finish that lands clean instead of loud.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: rightOpacity, y: rightY }}
            className="absolute inset-0 flex items-center justify-end px-6 text-right sm:px-12 lg:px-24"
          >
            <div className="ml-auto max-w-[31rem]">
              <p className="mb-5 text-xs font-semibold uppercase text-brayan-sage">
                60 percent bloom
              </p>
              <h2 className="text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9]">
                Roasted for the slow pour.
              </h2>
              <p className="ml-auto mt-7 max-w-sm text-base leading-7 text-brayan-mist">
                Tuned for espresso, filter, and the small pause before the day begins.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="absolute inset-0 flex items-center justify-center px-6 text-center"
          >
            <div className="pointer-events-auto max-w-3xl">
              <p className="mb-5 text-xs font-semibold uppercase text-brayan-copper">
                90 percent release
              </p>
              <h2 className="text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.88]">
                Open the next roast.
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-brayan-mist sm:text-lg">
                Meet the lot, taste the curve, and reserve a bag while the sequence is still warm.
              </p>
              <div className="mt-10">
                <MagneticButton href="#craft">Explore the roast</MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div style={{ opacity: hudOpacity }} className="absolute bottom-0 left-0 z-20 h-px w-full bg-brayan-cream/10">
          <motion.div style={{ width: progressWidth }} className="h-full bg-brayan-copper" />
        </motion.div>
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute left-6 top-24 z-20 hidden max-w-xs rounded-xl border border-brayan-cream/20 bg-[rgba(11,6,2,0.52)] p-4 backdrop-blur-sm sm:block"
        >
          <p className="text-[0.58rem] uppercase tracking-[0.2em] text-brayan-copper">{activeVibe.tag}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.12em] text-brayan-cream">
            {activeVibe.title}
          </p>
          <p className="mt-2 text-xs leading-5 text-brayan-mist/85">{activeVibe.subtitle}</p>
        </motion.div>
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute bottom-6 left-6 z-20 hidden rounded-full border border-brayan-cream/20 bg-[rgba(11,6,2,0.5)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-brayan-mist/80 backdrop-blur-sm sm:block"
        >
          Frame {String(currentFrame).padStart(3, "0")} / {END_FRAME}
        </motion.div>
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute bottom-6 right-6 z-20 hidden rounded-full border border-brayan-cream/20 bg-[rgba(11,6,2,0.5)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-brayan-mist/80 backdrop-blur-sm sm:block"
        >
          Scroll progress {sequenceProgress}%
        </motion.div>
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute bottom-20 left-1/2 z-20 hidden w-[min(32rem,58vw)] -translate-x-1/2 gap-2 sm:grid sm:grid-cols-4"
        >
          {vibeChapters.map((chapter) => {
            const chapterProgress = Math.min(
              1,
              Math.max(0, (sequenceRatio - chapter.from) / (chapter.to - chapter.from)),
            );

            return (
              <div
                key={chapter.title}
                className="h-1 overflow-hidden rounded-full bg-brayan-cream/15"
              >
                <div
                  className="h-full bg-brayan-copper transition-transform duration-300"
                  style={{ transform: `scaleX(${chapterProgress})`, transformOrigin: "left" }}
                />
              </div>
            );
          })}
        </motion.div>
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute top-24 right-6 z-20 hidden rounded-full border border-brayan-cream/20 bg-[rgba(11,6,2,0.5)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-brayan-mist/80 backdrop-blur-sm sm:block"
        >
          Camera kinetic {Math.round(kineticLevel * 100)}%
        </motion.div>
      </div>
    </section>
  );
}
