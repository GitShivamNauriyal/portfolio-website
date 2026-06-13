import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import BlurReveal from "../ui/BlurReveal.jsx";
import ProjectModal from "../ui/ProjectModal.jsx";
import { completedProjects } from "../../data/projects.js";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Add 5% extra scroll distance so track scrolls slightly past visible cards
      const totalScroll = track.scrollWidth - window.innerWidth;
      const extraScroll = totalScroll + window.innerWidth * 0.05;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${extraScroll}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      <div
        className="absolute top-0 left-0 z-10 px-6 md:px-12 lg:px-20"
        style={{ paddingTop: "100px" }}
      >
        <BlurReveal>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-2"
            style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}
          >
            Selected Work
          </p>
          <h2
            className="text-section-title"
            style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
          >
            Projects
          </h2>
        </BlurReveal>
      </div>

      <div
        ref={trackRef}
        className="flex items-center"
        style={{
          height: "100vh",
          width: "fit-content",
          paddingLeft: "60px",
          paddingRight: "120px",
          gap: "32px",
          paddingTop: "40px",
        }}
      >
        <div className="flex-shrink-0" style={{ width: "280px" }} />

        {completedProjects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-card-${project.id}`}
            className="glass flex-shrink-0 relative overflow-hidden"
            style={{
              width: "380px",
              height: "480px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              willChange: "transform",
            }}
            onClick={() => setSelectedProject(project)}
            whileHover={{
              scale: 1.03,
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.08, ease: "easeOut" }}
            data-hoverable
          >
            {project.tier === 1 && (
              <div className="absolute top-6 right-6 tier-dot" title="Featured" />
            )}

            <div>
              <span
                className="text-mono text-sm block mb-6"
                style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)", fontSize: "13px" }}
              >
                {project.number}
              </span>

              <h3
                className="text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  color: "var(--c-text)",
                  lineHeight: 1.2,
                }}
              >
                {project.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--c-muted)", lineHeight: 1.7 }}
              >
                {project.shortDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="glass-pill" style={{ fontSize: "11px", padding: "4px 12px" }}>
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span
                  className="glass-pill"
                  style={{ fontSize: "11px", padding: "4px 12px", color: "var(--c-orange)" }}
                >
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
