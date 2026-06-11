import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurReveal from "../ui/BlurReveal.jsx";
import { skillCategories } from "../../data/skills.js";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const panelsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current;
    if (!section || !panels) return;

    const ctx = gsap.context(() => {
      const totalScroll = panels.scrollWidth - window.innerWidth;

      gsap.to(panels, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const aboutSkills = skillCategories.slice(0, 4); // Show first 4 categories

  return (
    <section id="about" ref={sectionRef}>
      <div ref={triggerRef} className="overflow-hidden" style={{ minHeight: "100vh" }}>
        <div
          ref={panelsRef}
          className="flex items-center"
          style={{ height: "100vh", width: "fit-content" }}
        >
          {/* Panel 1: Bio */}
          <div
            className="flex items-center justify-center flex-shrink-0 px-6 md:px-20"
            style={{ width: "100vw", height: "100vh" }}
          >
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20" style={{ maxWidth: "1200px" }}>
              {/* Avatar */}
              <BlurReveal className="flex-shrink-0">
                <div
                  className="glass overflow-hidden"
                  style={{
                    width: "280px",
                    height: "280px",
                    borderRadius: "24px",
                  }}
                >
                  <img
                    src="/images/avatar.png"
                    alt="Shivam Nauriyal"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(20%)" }}
                  />
                </div>
              </BlurReveal>

              {/* Bio text */}
              <div style={{ maxWidth: "500px" }}>
                <BlurReveal>
                  <p
                    className="text-xs uppercase tracking-[0.3em] mb-4"
                    style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}
                  >
                    About Me
                  </p>
                </BlurReveal>
                <BlurReveal delay={0.1}>
                  <h2
                    className="text-section-title mb-6"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
                  >
                    Building at the
                    <br />
                    <span style={{ color: "var(--c-orange)" }}>lowest level</span>
                  </h2>
                </BlurReveal>
                <BlurReveal delay={0.2}>
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: "var(--c-muted)", lineHeight: 1.8 }}
                  >
                    I'm Shivam Nauriyal, a 4th-year B.Tech CSE student with an obsession
                    for understanding how things work under the hood. From writing compilers
                    and kernel modules to training neural networks — I build systems that
                    push the boundaries of what's possible.
                  </p>
                </BlurReveal>
                <BlurReveal delay={0.3}>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--c-muted)", lineHeight: 1.8 }}
                  >
                    My work spans the full spectrum: bare-metal systems programming in C/C++,
                    Linux kernel internals, distributed database engines, and production ML
                    pipelines. I believe the best engineers understand every layer of the stack.
                  </p>
                </BlurReveal>
              </div>
            </div>
          </div>

          {/* Panel 2: Skills grid */}
          <div
            className="flex items-center justify-center flex-shrink-0 px-6 md:px-20"
            style={{ width: "100vw", height: "100vh" }}
          >
            <div style={{ maxWidth: "1000px", width: "100%" }}>
              <BlurReveal>
                <p
                  className="text-xs uppercase tracking-[0.3em] mb-4"
                  style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}
                >
                  Tech Stack
                </p>
                <h2
                  className="text-section-title mb-12"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
                >
                  What I work with
                </h2>
              </BlurReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {aboutSkills.map((cat, catIndex) => (
                  <BlurReveal key={cat.category} delay={catIndex * 0.1}>
                    <div className="glass p-6" style={{ borderRadius: "16px" }}>
                      <h3
                        className="text-sm uppercase tracking-wider mb-4"
                        style={{
                          color: "var(--c-text)",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 500,
                          fontSize: "12px",
                        }}
                      >
                        {cat.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, skillIndex) => (
                          <BlurReveal
                            key={skill}
                            delay={catIndex * 0.1 + skillIndex * 0.03}
                          >
                            <span className="glass-pill">{skill}</span>
                          </BlurReveal>
                        ))}
                      </div>
                    </div>
                  </BlurReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
