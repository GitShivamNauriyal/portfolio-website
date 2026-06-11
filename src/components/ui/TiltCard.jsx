import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

export default function TiltCard({
  children,
  className = "",
  intensity = 15,
  style,
  ...props
}) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`glass ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        perspective: 800,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
