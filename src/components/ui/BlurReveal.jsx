import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function BlurReveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 20,
  blur = 12,
  className = "",
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: `blur(${blur}px)`, y }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: `blur(${blur}px)`, y }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
