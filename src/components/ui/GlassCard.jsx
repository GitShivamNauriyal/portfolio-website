import { motion } from "motion/react";

export default function GlassCard({
  children,
  className = "",
  onClick,
  hoverable = true,
  layoutId,
  style,
  dashed = false,
  ...props
}) {
  const baseClass = dashed ? "glass-dashed" : "glass";

  return (
    <motion.div
      className={`${baseClass} ${className}`}
      onClick={onClick}
      layoutId={layoutId}
      style={{ ...style, willChange: "transform" }}
      whileHover={
        hoverable
          ? { scale: 1.02, y: -4, transition: { duration: 0.3, ease: "easeOut" } }
          : undefined
      }
      whileTap={onClick ? { scale: 0.98 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
