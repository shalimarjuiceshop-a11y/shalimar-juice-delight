import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;       // ms per char while typing
  pause?: number;       // ms held when fully typed
  loop?: boolean;
  cursor?: boolean;
}

/**
 * Lightweight typewriter that types a phrase letter-by-letter, pauses,
 * then optionally erases & restarts.
 */
const Typewriter = ({
  text,
  className,
  speed = 90,
  pause = 1800,
  loop = true,
  cursor = true,
}: TypewriterProps) => {
  const [shown, setShown] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (shown.length < text.length) {
        t = setTimeout(() => setShown(text.slice(0, shown.length + 1)), speed);
      } else {
        t = setTimeout(() => setPhase(loop ? "holding" : "holding"), 0);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase(loop ? "erasing" : "holding"), pause);
    } else {
      if (shown.length > 0) {
        t = setTimeout(() => setShown(text.slice(0, shown.length - 1)), 40);
      } else {
        t = setTimeout(() => setPhase("typing"), 400);
      }
    }
    return () => clearTimeout(t);
  }, [shown, phase, text, speed, pause, loop]);

  return (
    <span className={className} aria-label={text}>
      {shown}
      {cursor && (
        <span
          className="inline-block w-[2px] ml-1 align-middle bg-current animate-pulse"
          style={{ height: "0.9em" }}
        />
      )}
    </span>
  );
};

export default Typewriter;
