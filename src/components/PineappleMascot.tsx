import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Messages per route
const routeMessages: Record<string, string[]> = {
  "/": [
    "Welcome! 🍍 Try our fresh juices!",
    "Sirf ₹10 mein juice! 🤩",
    "Since generations... pure taste! ✨",
  ],
  "/menu": [
    "Hungry? Pick your favorite! 😋",
    "Try our Bestsellers! 🏆",
    "Pineapple Shake is 🔥",
    "Scroll down for the quiz! 🎯",
  ],
  "/gallery": [
    "Dekho humari shop! 📸",
    "Click photos for full view! 🔍",
    "Fresh juice, fresh vibes! 🌟",
  ],
  "/franchise": [
    "Apna business shuru karo! 💼",
    "Starting at just ₹3 Lakh! 🚀",
    "50+ franchise opportunities! 📈",
  ],
  "/contact": [
    "Baat karo humse! 📞",
    "WhatsApp pe order karo! 💬",
    "We'd love to hear from you! 💛",
  ],
};

const defaultMessages = [
  "Hello! 🍍",
  "Fresh juice peeo! 🥤",
  "Kuch chahiye? 😊",
];

// Pineapple face expressions
type Expression = "happy" | "wink" | "excited" | "cool";

const expressions: Record<Expression, { leftEye: string; rightEye: string; mouth: string }> = {
  happy: { leftEye: "●", rightEye: "●", mouth: "◡" },
  wink: { leftEye: "●", rightEye: "−", mouth: "◡" },
  excited: { leftEye: "★", rightEye: "★", mouth: "D" },
  cool: { leftEye: "◕", rightEye: "◕", mouth: "‿" },
};

const expressionCycle: Expression[] = ["happy", "wink", "excited", "cool", "happy"];

const PineappleMascot = () => {
  const location = useLocation();
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState("");
  const [expression, setExpression] = useState<Expression>("happy");
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const getMessages = useCallback(() => {
    const path = location.pathname;
    // Check exact match first, then prefix match for franchise sub-routes
    if (routeMessages[path]) return routeMessages[path];
    if (path.startsWith("/franchise")) return routeMessages["/franchise"];
    return defaultMessages;
  }, [location.pathname]);

  // Show message on route change
  useEffect(() => {
    setMessageIndex(0);
    const msgs = getMessages();
    setMessage(msgs[0]);
    setExpression("excited");
    setShowBubble(true);

    const hideTimer = setTimeout(() => {
      setShowBubble(false);
      setExpression("happy");
    }, 4000);

    return () => clearTimeout(hideTimer);
  }, [location.pathname, getMessages]);

  // Cycle messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMinimized) return;
      const msgs = getMessages();
      const nextIdx = (messageIndex + 1) % msgs.length;
      setMessageIndex(nextIdx);
      setMessage(msgs[nextIdx]);
      setExpression(expressionCycle[nextIdx % expressionCycle.length]);
      setShowBubble(true);

      setTimeout(() => {
        setShowBubble(false);
        setExpression("happy");
      }, 3500);
    }, 10000);

    return () => clearInterval(interval);
  }, [messageIndex, isMinimized, getMessages]);

  const handleClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setExpression("excited");
      const msgs = getMessages();
      setMessage(msgs[messageIndex]);
      setShowBubble(true);
      setTimeout(() => {
        setShowBubble(false);
        setExpression("happy");
      }, 3000);
      return;
    }
    // Cycle to next message on click
    const msgs = getMessages();
    const nextIdx = (messageIndex + 1) % msgs.length;
    setMessageIndex(nextIdx);
    setMessage(msgs[nextIdx]);
    setExpression("wink");
    setShowBubble(true);
    setTimeout(() => {
      setShowBubble(false);
      setExpression("happy");
    }, 3000);
  };

  const face = expressions[expression];

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none" style={{ pointerEvents: "auto" }}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.3, ease: smoothEase }}
            className="absolute bottom-full left-4 mb-2 max-w-[180px]"
          >
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3 py-2 shadow-pineapple">
              <p className="font-body text-xs font-semibold text-foreground leading-relaxed">
                {message}
              </p>
            </div>
            {/* Bubble tail */}
            <div
              className="w-3 h-3 bg-card border-l border-b border-border absolute -bottom-1.5 left-3"
              style={{ transform: "rotate(-45deg)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pineapple Character */}
      <motion.div
        onClick={handleClick}
        className="cursor-pointer relative"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Minimize button */}
        {!isMinimized && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
              setShowBubble(false);
            }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
            style={{ fontSize: "10px" }}
          >
            ✕
          </motion.button>
        )}

        {/* SVG Pineapple */}
        <motion.div
          className={`relative ${isMinimized ? "w-10 h-10" : "w-14 h-14 md:w-16 md:h-16"} transition-all duration-300`}
          animate={expression === "excited" ? { rotate: [0, -5, 5, -3, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">
            {/* Leaves */}
            <motion.g
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "50px 30px" }}
            >
              <ellipse cx="50" cy="18" rx="6" ry="16" fill="hsl(120 30% 35%)" transform="rotate(-15, 50, 18)" />
              <ellipse cx="50" cy="18" rx="6" ry="16" fill="hsl(120 35% 40%)" transform="rotate(15, 50, 18)" />
              <ellipse cx="50" cy="16" rx="5" ry="14" fill="hsl(120 40% 45%)" />
            </motion.g>

            {/* Body */}
            <ellipse cx="50" cy="70" rx="30" ry="38" fill="hsl(40 100% 50%)" />
            <ellipse cx="50" cy="70" rx="30" ry="38" fill="url(#pineappleGrad)" />
            
            {/* Diamond pattern */}
            {[45, 55, 65, 75, 85].map((y) =>
              [35, 50, 65].map((x) => (
                <path
                  key={`${x}-${y}`}
                  d={`M${x},${y - 4} L${x + 4},${y} L${x},${y + 4} L${x - 4},${y}`}
                  fill="none"
                  stroke="hsl(35 80% 40%)"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
              ))
            )}

            {/* Face */}
            {!isMinimized && (
              <g>
                {/* Eyes */}
                <text x="40" y="68" textAnchor="middle" fontSize="10" fill="hsl(30 15% 15%)">
                  {face.leftEye}
                </text>
                <text x="60" y="68" textAnchor="middle" fontSize="10" fill="hsl(30 15% 15%)">
                  {face.rightEye}
                </text>
                
                {/* Mouth */}
                <text x="50" y="80" textAnchor="middle" fontSize="12" fill="hsl(30 15% 15%)">
                  {face.mouth}
                </text>

                {/* Blush */}
                <circle cx="34" cy="74" r="4" fill="hsl(0 60% 70%)" opacity="0.3" />
                <circle cx="66" cy="74" r="4" fill="hsl(0 60% 70%)" opacity="0.3" />
              </g>
            )}

            {/* Gradient definition */}
            <defs>
              <radialGradient id="pineappleGrad" cx="40%" cy="35%">
                <stop offset="0%" stopColor="hsl(45 100% 65%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(35 90% 45%)" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Sparkle on excited */}
          <AnimatePresence>
            {expression === "excited" && (
              <>
                {[
                  { x: -4, y: 2, delay: 0 },
                  { x: 48, y: -2, delay: 0.1 },
                  { x: 20, y: -8, delay: 0.2 },
                ].map((s, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-primary pointer-events-none"
                    style={{ left: s.x, top: s.y, fontSize: "10px" }}
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: -12 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: s.delay }}
                  >
                    ✦
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PineappleMascot;
