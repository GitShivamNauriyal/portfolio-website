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

      // Staggered pill animations for skill pills in Panel 2
      const skillPanelCats = section.querySelectorAll(".skill-category");
      skillPanelCats.forEach((cat) => {
        const pills = cat.querySelectorAll(".skill-pill-anim");
        gsap.fromTo(
          pills,
          { opacity: 0, y: 16, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cat,
              start: "left 80%",
              containerAnimation: gsap.getById?.("about-scroll") || undefined,
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

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
                  className="relative overflow-hidden"
                  style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: "24px",
                  }}
                >
                  <img
                    src="/images/pfp_1x1.jpg"
                    alt="Shivam Nauriyal"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(20%)" }}
                  />
                  {/* Vignette Overlay hardcoded to dark background color */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, transparent 40%, #080808 100%)",
                      boxShadow: "inset 0 0 30px #080808"
                    }}
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

          {/* Panel 2: Skills grid — ALL categories */}
          <div
            className="flex items-center flex-shrink-0"
            style={{
              width: "100vw",
              height: "100vh",
              paddingLeft: "80px",
              paddingRight: "200px",
            }}
          >
            {/* Left column: heading (mirrors Panel 1 "About Me" alignment) */}
            <div
              className="flex-shrink-0 flex flex-col justify-center"
              style={{
                width: "320px",
                marginRight: "60px",
                height: "100%",
              }}
            >
              <BlurReveal>
                <p
                  className="text-xs uppercase tracking-[0.3em] mb-4"
                  style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}
                >
                  Tech Stack
                </p>
                <h2
                  className="text-section-title"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
                >
                  What I
                  <br />
                  work
                  <span style={{ color: "var(--c-orange)" }}> with</span>
                </h2>
              </BlurReveal>
            </div>

            {/* Right: skill cards grid — 3 columns × 2 rows */}
            <div
              className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-12"
              style={{
                flex: 1,
                maxWidth: "1000px",
                alignContent: "center",
                height: "fit-content",
              }}
            >
              {skillCategories.map((cat, catIndex) => (
                <BlurReveal key={cat.category} delay={catIndex * 0.08}>
                  <div className="skill-category glass p-4" style={{ borderRadius: "16px" }}>
                    <h3
                      className="text-sm uppercase tracking-wider mb-3"
                      style={{
                        color: "var(--c-orange)",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 500,
                        fontSize: "11px",
                      }}
                    >
                      {cat.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="glass-pill skill-pill-anim"
                          style={{ fontSize: "12px", padding: "4px 12px" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </BlurReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
