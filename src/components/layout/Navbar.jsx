import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider.jsx";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Coding", href: "#coding" },
  // { label: "Certs", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false); // Close menu immediately on tap

    // Add a tiny delay so the menu closing animation doesn't cancel the mobile smooth scroll
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }, []);

  return (
    <motion.nav
      className={`glass-nav ${scrolled ? "scrolled" : ""} fixed top-0 left-0 right-0 z-50`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: "1400px",
          padding: "16px 24px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-semibold tracking-tight"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--c-text)",
            textDecoration: "none",
            fontWeight: 600,
          }}
          data-hoverable
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          SN
          <span style={{ color: "var(--c-orange)" }}>.</span>
        </a>

        {/* Desktop Nav */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: "32px" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-sm transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color:
                  activeSection === link.href.replace("#", "")
                    ? "var(--c-text)"
                    : "var(--c-muted)",
                textDecoration: "none",
                fontSize: "14px",
              }}
              data-hoverable
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: "-8px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "var(--c-orange)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right side: theme toggle + mobile menu */}
        <div className="flex items-center" style={{ gap: "12px" }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "var(--c-glass-bg)",
              border: "1px solid var(--c-glass-border)",
              color: "var(--c-muted)",
            }}
            aria-label="Toggle theme"
            data-hoverable
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.svg
                  key="sun"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ rotate: -90, opacity: 0, scale: 0 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="moon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ rotate: 90, opacity: 0, scale: 0 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "var(--c-glass-bg)",
              border: "1px solid var(--c-glass-border)",
              color: "var(--c-muted)",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-hoverable
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              margin: "0 16px 16px",
              overflow: "hidden",
              backdropFilter: "blur(30px) saturate(200%)",
              WebkitBackdropFilter: "blur(30px) saturate(200%)",
              backgroundColor: theme === "dark" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.6)"
            }}
          >
            <div className="flex flex-col p-6" style={{ gap: "20px" }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-lg block w-full py-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 300,
                    color: "var(--c-text)",
                    textDecoration: "none",
                  }}
                  data-hoverable
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
