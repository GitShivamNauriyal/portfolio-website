import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurReveal from "../ui/BlurReveal.jsx";
import { skillCategories } from "../../data/skills.js";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const categories = section.querySelectorAll(".skill-category");

      categories.forEach((cat, catIndex) => {
        const pills = cat.querySelectorAll(".skill-pill-anim");

        gsap.fromTo(
          pills,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cat,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="section-max">
        <BlurReveal>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}
          >
            Technical Skills
          </p>
          <h2
            className="text-section-title mb-16"
            style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
          >
            Tools of the trade
          </h2>
        </BlurReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, catIndex) => (
            <BlurReveal key={cat.category} delay={catIndex * 0.08}>
              <div className="skill-category glass p-6" style={{ borderRadius: "16px" }}>
                <h3
                  className="text-sm uppercase tracking-wider mb-5"
                  style={{
                    color: "var(--c-orange)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="glass-pill skill-pill-anim"
                      style={{ opacity: 0 }}
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
    </section>
  );
}
