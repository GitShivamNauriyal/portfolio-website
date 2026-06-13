import { motion } from "motion/react";
import BlurReveal from "../ui/BlurReveal.jsx";
import { useMagneticHover } from "../../hooks/useMagneticHover.js";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:shivamnauriyal1224@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/GitShivamNauriyal",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shivam-nauriyal",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/shivam_nauriyal",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
];

function MagneticButton({ href, label, icon }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticHover(0.35);

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="glass flex items-center gap-3 px-8 py-6 rounded-2xl"
      style={{
        textDecoration: "none",
        color: "var(--c-muted)",
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: "15px",
        transition: "color 0.3s ease, border-color 0.3s ease",
      }}
      whileHover={{ scale: 1.05 }}
      data-hoverable
    >
      {icon}
      <span>{label}</span>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative"
      style={{
        paddingBottom: "4rem",
      }}>
      <div className="section-max text-center">
        {/* Status */}
        <BlurReveal>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="status-dot" />
            <p
              className="text-sm"
              style={{ color: "var(--c-green)", fontFamily: "var(--font-mono)" }}
            >
              Open to opportunities
            </p>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.1}>
          <h2
            className="text-section-title mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
          >
            Let's build something
            <br />
            <span style={{ color: "var(--c-orange)" }}>together</span>
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.2} className="flex justify-center py-2">
          <p
            className="text-base mb-12 mx-auto"
            style={{ color: "var(--c-muted)", maxWidth: "500px", lineHeight: 1.4, marginTop: "4px", marginBottom: "12px" }}
          >
            Whether it's a systems-level challenge, an ML problem, or a wild idea —
            I'm always down to chat.
          </p>
        </BlurReveal>

        {/* Social links */}
        <BlurReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {socialLinks.map((link) => (
              <MagneticButton key={link.label} {...link} />
            ))}
          </div>
        </BlurReveal>

        {/* Footer */}
        <BlurReveal delay={0.4}>
          <div
            className="mt-24 pt-8"
            style={{ borderTop: "1px solid var(--c-line)" }}
          >
            <p
              className="text-sm"
              style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)" }}
            >
              © {new Date().getFullYear()} Shivam Nauriyal. Crafted with obsession.
            </p>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
