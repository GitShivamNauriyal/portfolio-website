import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurReveal from "../ui/BlurReveal.jsx";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Systems Programmer",
  "ML Engineer",
  "Kernel Hacker",
  "Low-Level Architect",
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span>
      {text}
      <span className="typewriter-cursor" />
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const gridRef = useRef(null);

  // GSAP: character stagger reveal for name
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".char");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // GSAP: grid parallax drift
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.to(grid, {
        y: "+=60",
        x: "+=30",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  // Split name into individual characters
  const nameChars = useMemo(() => {
    const name = "Shivam Nauriyal";
    return name.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ opacity: 0 }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, []);

  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Animated grid background */}
      <div ref={gridRef} className="grid-bg" />

      {/* Ambient glow orbs */}
      <div className="hero-glow hero-glow-orange" />
      <div className="hero-glow hero-glow-green" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--c-bg) 70%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6" style={{ maxWidth: "900px" }}>
        {/* Greeting */}
        <BlurReveal delay={0}>
          <p
            className="text-sm uppercase tracking-[0.3em] mb-6"
            style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)" }}
          >
            hello, i'm
          </p>
        </BlurReveal>

        {/* Name — GSAP char stagger */}
        <h1
          ref={nameRef}
          className="text-hero mb-6"
          style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
        >
          {nameChars}
        </h1>

        {/* Role — typewriter */}
        <BlurReveal delay={0.8}>
          <p
            className="text-xl md:text-2xl mb-4"
            style={{
              color: "var(--c-text)",
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              minHeight: "36px",
            }}
          >
            <TypewriterRole />
          </p>
        </BlurReveal>

        {/* Tagline */}
        <BlurReveal delay={1.0}>
          <p
            className="text-base md:text-lg mb-12 mx-auto"
            style={{
              color: "var(--c-muted)",
              maxWidth: "600px",
              lineHeight: 1.6,
            }}
          >
            Building compilers, kernel modules, and intelligent systems
            from the ground up. B.Tech CSE, 4th year.
          </p>
        </BlurReveal>

        {/* CTAs */}
        <BlurReveal delay={1.2}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => handleScrollTo("#projects")}
              className="glass cta-primary px-8 py-3.5 rounded-full text-sm font-medium"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--c-text)",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
              data-hoverable
            >
              View Projects
              <span className="ml-2" style={{ opacity: 0.5 }}>→</span>
            </button>
            <button
              onClick={() => handleScrollTo("#contact")}
              className="glass px-8 py-3.5 rounded-full text-sm font-medium"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--c-orange)",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
              data-hoverable
            >
              Get in Touch
            </button>
          </div>
        </BlurReveal>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator z-10"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--c-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
