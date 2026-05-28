import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import LiveShopTimeBadge from "./LiveShopTimeBadge";

/**
 * Premium "Shalimar Juice" storefront scene.
 *
 * Engineering notes (kept identical visual, optimized runtime):
 *  - All loops use GPU-friendly transform/opacity only (no layout-thrashing props)
 *  - Stars precomputed once via useMemo (no per-render allocations)
 *  - Time tick reduced to 5 min cadence (phase only changes at boundaries)
 *  - prefers-reduced-motion respected: static composition, no infinite loops
 *  - `will-change` hints set strategically; animations pause via CSS when tab hidden
 */
const MenuTasteAnimation = () => {
  const [phase, setPhase] = useState<"day" | "night" | "closed">("day");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const istMin = (now.getUTCHours() * 60 + now.getUTCMinutes() + 330) % 1440;
      if (istMin < 690 || istMin >= 1380) setPhase("closed");
      else if (istMin >= 19 * 60) setPhase("night");
      else setPhase("day");
    };
    update();
    const id = setInterval(update, 300_000); // 5 min — phase changes are rare
    return () => clearInterval(id);
  }, []);

  const isClosed = phase === "closed";
  const isNight = phase === "night" || isClosed;

  const sky = isClosed
    ? "linear-gradient(180deg,#070914 0%,#0f1530 55%,#1a1428 100%)"
    : isNight
    ? "linear-gradient(180deg,#0b1130 0%,#1a1f4a 50%,#3a2148 100%)"
    : "linear-gradient(180deg,#f9c46b 0%,#f29a3d 45%,#8a4a1f 100%)";

  // Precompute stars once — stable layout, zero per-render allocation churn
  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        top: `${(i * 11) % 42}%`,
        left: `${(i * 37) % 100}%`,
        size: i % 4 === 0 ? 2.5 : 1.5,
        dur: 2 + (i % 5),
        delay: i * 0.13,
      })),
    []
  );

  // Repeat helper: when reduced motion is requested, return 0 (no loops)
  const loop = (n: number | typeof Infinity) => (reduceMotion ? 0 : n);

  return (
    <div
      className="relative w-full h-[280px] md:h-[360px] overflow-hidden rounded-2xl border border-primary/20 shadow-pineapple"
      style={{ background: sky, contain: "layout paint", transform: "translateZ(0)" }}
      aria-label="Shalimar Juice storefront"
    >
      <LiveShopTimeBadge />

      {/* ---------- SKY LAYER ---------- */}
      {isNight &&
        stars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              boxShadow: "0 0 6px rgba(255,255,255,0.9)",
              willChange: "opacity",
            }}
            animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: s.dur, repeat: loop(Infinity), delay: s.delay }}
          />
        ))}

      {/* Sun / Moon */}
      <div className="absolute top-5 right-8 md:top-7 md:right-12">
        <div
          className="absolute -inset-6 rounded-full blur-2xl"
          style={{
            background: isNight
              ? "radial-gradient(circle, rgba(220,225,255,0.55), transparent 70%)"
              : "radial-gradient(circle, rgba(255,210,120,0.7), transparent 70%)",
          }}
        />
        <motion.div
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full"
          style={{
            background: isNight
              ? "radial-gradient(circle at 38% 38%, #f5f3ec, #c9c8d6 70%, #8c8aa3)"
              : "radial-gradient(circle at 40% 40%, #fff6c8, #f4a942 70%, #c2691a)",
            willChange: "transform",
          }}
          animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: loop(Infinity), ease: "easeInOut" }}
        />
      </div>

      {/* Distant mountain silhouette */}
      <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="absolute bottom-[34%] left-0 w-full h-[60px] opacity-70" aria-hidden>
        <path d="M0,180 L80,110 L160,150 L240,80 L320,140 L420,90 L520,150 L620,100 L720,140 L800,110 L800,200 L0,200 Z"
          fill={isNight ? "#0d1230" : "#5a3214"} />
      </svg>

      {/* ---------- GROUND ---------- */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[34%]"
        style={{
          background: isNight
            ? "linear-gradient(180deg,#1a1228 0%,#0a0612 100%)"
            : "linear-gradient(180deg,#3a1f0e 0%,#1a0d05 100%)",
        }}
      />
      <div className="absolute left-0 right-0 bottom-[33.6%] h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

      {/* ---------- STOREFRONT ---------- */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[78%] max-w-[520px]">
        <div className="relative">
          {/* Neon sign */}
          <motion.div
            className="relative mx-auto w-[88%] rounded-md py-2 px-3 text-center"
            style={{
              background: "linear-gradient(180deg,#1a0f08,#0d0805)",
              border: "1px solid rgba(255,200,90,0.35)",
              boxShadow: "0 0 18px rgba(255,170,60,0.35), inset 0 0 12px rgba(0,0,0,0.6)",
              willChange: "opacity",
            }}
            animate={reduceMotion ? undefined : { opacity: [1, 0.94, 1, 0.97, 1] }}
            transition={{ duration: 4, repeat: loop(Infinity), ease: "easeInOut" }}
          >
            <div
              className="font-display font-black tracking-[0.18em] text-[11px] md:text-sm"
              style={{
                color: "#ffd87a",
                textShadow:
                  "0 0 6px rgba(255,200,90,0.95), 0 0 14px rgba(255,150,40,0.7), 0 0 22px rgba(255,120,20,0.5)",
              }}
            >
              SHALIMAR JUICE
            </div>
            <div className="text-[8px] md:text-[9px] font-body tracking-[0.3em] text-amber-200/70 mt-0.5">
              EST. FRESH · MUMBAI
            </div>
          </motion.div>

          {/* Striped awning */}
          <div
            className="mt-1 h-3 md:h-4 rounded-b-md"
            style={{
              background:
                "repeating-linear-gradient(90deg,#b91c1c 0 14px,#fef3c7 14px 28px)",
              boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.35)",
            }}
          />
          <svg viewBox="0 0 200 10" preserveAspectRatio="none" className="w-full h-2 -mt-px" aria-hidden>
            <path d="M0,0 Q10,10 20,0 T40,0 T60,0 T80,0 T100,0 T120,0 T140,0 T160,0 T180,0 T200,0 L200,10 L0,10 Z"
              fill="#7f1212" />
          </svg>
        </div>

        {/* Counter / window box */}
        <div
          className="relative mt-1 h-[110px] md:h-[140px] rounded-md overflow-hidden"
          style={{
            background: "linear-gradient(180deg,#1f1108 0%,#100804 100%)",
            border: "1px solid rgba(255,180,80,0.22)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.7)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(255,170,60,0.28), transparent 65%)",
            }}
          />

          {/* Hanging pineapple bulbs */}
          {[12, 32, 52, 72, 88].map((leftPct, i) => (
            <div key={i} className="absolute top-0" style={{ left: `${leftPct}%` }}>
              <div className="w-px h-3 md:h-4 bg-amber-200/40 mx-auto" />
              <motion.div
                className="origin-top"
                style={{ willChange: "transform" }}
                animate={reduceMotion ? undefined : { rotate: [-3, 3, -3] }}
                transition={{ duration: 3 + (i % 3) * 0.5, repeat: loop(Infinity), ease: "easeInOut", delay: i * 0.2 }}
              >
                <div
                  className="w-3 h-4 md:w-3.5 md:h-5 rounded-full -mt-px mx-auto"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #fff2a8, #f5b938 60%, #a76a10)",
                    boxShadow: "0 0 10px rgba(255,190,80,0.7)",
                  }}
                />
              </motion.div>
            </div>
          ))}

          {!isClosed && (
            <>
              {/* Menu board */}
              <div
                className="absolute left-3 top-7 md:top-8 w-[26%] rounded-sm p-1.5 text-[7px] md:text-[8px] leading-tight font-body"
                style={{
                  background: "#0a0604",
                  border: "1px solid rgba(255,200,90,0.4)",
                  color: "#ffd87a",
                  boxShadow: "0 0 8px rgba(255,170,60,0.2)",
                }}
              >
                <div className="text-center font-bold tracking-widest mb-0.5 text-amber-300">MENU</div>
                {[
                  ["Juice", "₹10"],
                  ["Shake", "₹20"],
                  ["Dry Fruit", "₹30"],
                ].map(([n, p]) => (
                  <div key={n} className="flex justify-between gap-1">
                    <span className="opacity-80">{n}</span>
                    <span className="font-bold">{p}</span>
                  </div>
                ))}
              </div>

              {/* Counter top */}
              <div
                className="absolute left-0 right-0 bottom-0 h-[34%]"
                style={{
                  background: "linear-gradient(180deg,#3a2010 0%,#1a0d05 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,200,90,0.25)",
                }}
              />

              {/* Barista silhouette */}
              <div className="absolute left-[42%] bottom-[34%]">
                <motion.svg
                  viewBox="0 0 60 70"
                  className="w-[42px] h-[52px] md:w-[52px] md:h-[64px]"
                  style={{ willChange: "transform" }}
                  animate={reduceMotion ? undefined : { y: [0, -1, 0] }}
                  transition={{ duration: 2.4, repeat: loop(Infinity), ease: "easeInOut" }}
                  aria-hidden
                >
                  <ellipse cx="30" cy="10" rx="14" ry="9" fill="#fafafa" />
                  <rect x="18" y="14" width="24" height="5" rx="1.5" fill="#fafafa" />
                  <circle cx="30" cy="24" r="6.5" fill="#1a0f08" />
                  <path d="M16,32 Q30,28 44,32 L46,66 L14,66 Z" fill="#7f1212" />
                  <rect x="26" y="36" width="8" height="26" fill="#fef3c7" opacity="0.9" />
                  {/* Arm: rotate around shoulder — GPU transform instead of path morph */}
                  <motion.g
                    style={{ transformOrigin: "44px 34px", transformBox: "fill-box" } as React.CSSProperties}
                    animate={reduceMotion ? undefined : { rotate: [0, -4, 0] }}
                    transition={{ duration: 2.4, repeat: loop(Infinity), ease: "easeInOut" }}
                  >
                    <path
                      d="M44,34 Q52,28 50,22"
                      stroke="#7f1212"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.g>
                </motion.svg>
              </div>

              {/* Pour stream — scaleY (GPU) instead of height animation */}
              <motion.div
                className="absolute origin-top"
                style={{
                  left: "calc(42% + 46px)",
                  bottom: "calc(34% + 4px)",
                  width: 2,
                  height: 22,
                  background: "linear-gradient(180deg, rgba(255,210,120,0.95), rgba(255,160,40,0.4))",
                  borderRadius: 2,
                  boxShadow: "0 0 4px rgba(255,180,60,0.7)",
                  willChange: "transform, opacity",
                }}
                animate={reduceMotion ? undefined : { scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: loop(Infinity), ease: "easeInOut" }}
              />

              {/* Hero juice glass */}
              <div className="absolute left-[60%] bottom-[34%]">
                <div className="relative w-[24px] h-[34px] md:w-[28px] md:h-[40px]">
                  <div
                    className="absolute inset-0 rounded-b-md rounded-t-sm"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
                      border: "1px solid rgba(255,255,255,0.35)",
                    }}
                  />
                  {/* Liquid: scaleY from bottom — no layout, GPU only */}
                  <div className="absolute left-[2px] right-[2px] bottom-[2px] top-[2px] rounded-b-md overflow-hidden">
                    <motion.div
                      className="absolute inset-x-0 bottom-0 origin-bottom"
                      style={{
                        height: "100%",
                        background: "linear-gradient(180deg,#ffcf5a,#e87a1f)",
                        willChange: "transform",
                      }}
                      animate={reduceMotion ? { scaleY: 0.6 } : { scaleY: [0.2, 0.85, 0.85, 0.2] }}
                      transition={{ duration: 2.4, repeat: loop(Infinity), ease: "easeInOut" }}
                    />
                    {/* Bubbles */}
                    {!reduceMotion &&
                      [0, 1, 2].map((b) => (
                        <motion.span
                          key={b}
                          className="absolute rounded-full bg-white/70"
                          style={{ width: 2, height: 2, left: `${20 + b * 25}%`, bottom: 2, willChange: "transform, opacity" }}
                          animate={{ y: [0, -22], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: b * 0.4, ease: "easeOut" }}
                        />
                      ))}
                  </div>
                  <div className="absolute top-1 left-1 w-[2px] h-[60%] bg-white/50 rounded-full" />
                </div>
              </div>

              {/* Kulhad with steam */}
              <div className="absolute right-4 bottom-[34%]">
                <div className="relative w-[22px] h-[20px] md:w-[26px] md:h-[24px]">
                  <div
                    className="absolute inset-0 rounded-b-lg"
                    style={{
                      background: "linear-gradient(180deg,#a0522d,#5a2a10)",
                      boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.4)",
                    }}
                  />
                  <div
                    className="absolute -top-1 left-0 right-0 h-1 rounded-full"
                    style={{ background: "#3a1f0e" }}
                  />
                </div>
                <svg viewBox="0 0 30 60" className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-12 overflow-visible" aria-hidden>
                  <defs>
                    <filter id="steamblur" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.2" />
                    </filter>
                  </defs>
                  {!reduceMotion &&
                    [0, 1, 2].map((s) => (
                      <motion.path
                        key={s}
                        d="M15,55 Q10,40 15,28 Q20,16 15,4"
                        stroke="rgba(255,240,200,0.6)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        filter="url(#steamblur)"
                        style={{ willChange: "transform, opacity" }}
                        animate={{ opacity: [0, 0.7, 0], y: [0, -8] }}
                        transition={{ duration: 4, repeat: Infinity, delay: s * 1.3, ease: "easeOut" }}
                      />
                    ))}
                </svg>
              </div>

              {/* Window light shafts */}
              <motion.div
                className="absolute top-0 left-[20%] w-[60%] h-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,200,100,0.18), transparent 70%)",
                  mixBlendMode: "screen",
                  willChange: "opacity",
                }}
                animate={reduceMotion ? undefined : { opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 3.5, repeat: loop(Infinity), ease: "easeInOut" }}
              />
            </>
          )}

          {/* Shutter (closed) */}
          {isClosed && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(180deg,#3a2418 0 4px,#241409 4px 8px)",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)",
              }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-sm bg-black/60 border border-red-500/60 text-red-300 font-display font-black tracking-[0.25em] text-[10px] md:text-xs">
                CLOSED
              </div>
            </div>
          )}
        </div>

        <div className="h-2 mx-auto w-[92%] rounded-full bg-black/60 blur-md -mt-1" />
      </div>

      {/* OPEN / CLOSED status pill */}
      <div className="absolute bottom-3 right-3">
        <div
          className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full backdrop-blur"
          style={{
            background: isClosed ? "rgba(80,10,10,0.7)" : "rgba(20,60,30,0.7)",
            border: `1px solid ${isClosed ? "rgba(255,80,80,0.5)" : "rgba(120,255,150,0.5)"}`,
            color: isClosed ? "#fca5a5" : "#bbf7d0",
          }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isClosed ? "#ef4444" : "#22c55e", willChange: "opacity" }}
            animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: loop(Infinity) }}
          />
          {isClosed ? "Closed" : "Open Now"}
        </div>
      </div>
    </div>
  );
};

export default MenuTasteAnimation;
