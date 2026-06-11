import { motion } from "motion/react";
import BlurReveal from "../ui/BlurReveal.jsx";
import GlassCard from "../ui/GlassCard.jsx";
import { inProgressProjects } from "../../data/projects.js";

export default function InProgress() {
  return (
    <section className="section-padding relative" style={{ paddingTop: "80px" }}>
      <div className="section-max">
        <BlurReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="status-dot" />
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--c-green)", fontFamily: "var(--font-mono)" }}
            >
              Currently Building
            </p>
          </div>
          <h2
            className="text-section-title mb-12"
            style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
          >
            In Progress
          </h2>
        </BlurReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inProgressProjects.map((project, i) => (
            <BlurReveal key={project.id} delay={i * 0.1}>
              <GlassCard
                dashed
                className="p-8 relative h-full"
                hoverable
              >
                {/* Green pulse ring */}
                <div className="wip-ring" />

                <span
                  className="text-mono text-sm block mb-4"
                  style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)", fontSize: "13px" }}
                >
                  {project.number}
                </span>

                <h3
                  className="text-xl mb-3"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 400,
                    color: "var(--c-text)",
                    lineHeight: 1.3,
                    paddingRight: "32px",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--c-muted)", lineHeight: 1.7 }}
                >
                  {project.shortDesc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="glass-pill"
                      style={{ fontSize: "11px", padding: "4px 12px" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
