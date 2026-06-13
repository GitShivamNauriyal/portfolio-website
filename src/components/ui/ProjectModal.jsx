import { motion, AnimatePresence } from "motion/react";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        key="modal-overlay"
      >
        <motion.div
          layoutId={`project-card-${project.id}`}
          className="glass-modal relative w-full max-w-3xl mx-4 max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ padding: "48px" }}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: "var(--c-glass-bg)",
              border: "1px solid var(--c-glass-border)",
              color: "var(--c-muted)",
            }}
            data-hoverable
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Number */}
          <span
            className="text-mono text-sm block mb-4"
            style={{ color: "var(--c-muted)" }}
          >
            {project.number}
          </span>

          {/* Title */}
          <h2
            className="font-heading text-3xl md:text-4xl mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              color: "var(--c-text)",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h2>

          {/* Tier indicator */}
          {project.tier === 1 && (
            <div className="flex items-center gap-2 mb-6">
              <span className="tier-dot" />
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}
              >
                Featured Project
              </span>
            </div>
          )}

          {/* Description */}
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--c-muted)", lineHeight: 1.8, fontSize: "15px" }}
          >
            {project.fullDesc}
          </p>

          {/* Tech stack */}
          <div className="mb-8">
            <span
              className="text-xs uppercase tracking-wider block mb-3"
              style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)" }}
            >
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="glass-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub link */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors"
            style={{
              color: "var(--c-text)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "14px",
              textDecoration: "none",
            }}
            data-hoverable
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
