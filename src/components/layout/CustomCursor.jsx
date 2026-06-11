import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 20 });

  const dotX = useSpring(cursorX, { stiffness: 800, damping: 30 });
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 30 });

  useEffect(() => {
    // Check if device has fine pointer (no touch)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, [data-hoverable]");
      if (target) setIsHovering(true);
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, [data-hoverable]");
      if (target) setIsHovering(false);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, visible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Ring */}
      <motion.div
        style={{
          position: "fixed",
          x: springX,
          y: springY,
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "var(--c-orange)" : "var(--c-cursor)"}`,
          backgroundColor: isHovering ? "rgba(249, 115, 22, 0.08)" : "transparent",
          mixBlendMode: "difference",
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
        }}
      />
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          x: dotX,
          y: dotY,
          width: isHovering ? 0 : 8,
          height: isHovering ? 0 : 8,
          borderRadius: "50%",
          backgroundColor: "var(--c-cursor)",
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
    </div>
  );
}
