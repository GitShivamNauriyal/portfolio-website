import { useEffect, useRef, useCallback } from "react";

/**
 * HeroEffects — Subtle ambient effects for the hero section.
 *
 * 1. Grid-pulse ripples: Concentric rings emanating from random positions
 *    every 2-4 seconds, expanding and fading like sonar pings.
 *
 * 2. Floating particles: Tiny luminous dots drifting slowly upward,
 *    fading in and out like dust motes in light.
 *
 * All effects are pointer-events:none, GPU-composited, and theme-aware.
 */

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function HeroEffects() {
  const containerRef = useRef(null);
  const rippleTimerRef = useRef(null);
  const particleTimerRef = useRef(null);

  // Create a pulse ripple at a random grid intersection
  const spawnRipple = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const ripple = document.createElement("div");
    ripple.className = "hero-ripple";

    const x = randomBetween(10, 90);
    const y = randomBetween(10, 90);

    ripple.style.left = `${x}%`;
    ripple.style.top = `${y}%`;
    ripple.style.animationDuration = `${randomBetween(2, 3)}s`;

    container.appendChild(ripple);

    // Clean up after animation
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });

    // Schedule next ripple in 2-4 seconds
    rippleTimerRef.current = setTimeout(spawnRipple, randomBetween(2000, 4000));
  }, []);

  // Create a floating particle
  const spawnParticle = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const particle = document.createElement("div");
    particle.className = "hero-particle";

    const x = randomBetween(5, 95);
    const startY = randomBetween(60, 95);
    const size = randomBetween(2, 4);
    const duration = randomBetween(4, 8);
    const drift = randomBetween(-30, 30);

    particle.style.left = `${x}%`;
    particle.style.bottom = `${100 - startY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.setProperty("--drift", `${drift}px`);
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);

    particle.addEventListener("animationend", () => {
      particle.remove();
    });

    // Schedule next particle in 0.8-2 seconds
    particleTimerRef.current = setTimeout(spawnParticle, randomBetween(800, 2000));
  }, []);

  useEffect(() => {
    // Initial delays so effects don't all start at once
    rippleTimerRef.current = setTimeout(spawnRipple, 1000);
    particleTimerRef.current = setTimeout(spawnParticle, 500);

    return () => {
      clearTimeout(rippleTimerRef.current);
      clearTimeout(particleTimerRef.current);
    };
  }, [spawnRipple, spawnParticle]);

  return (
    <div
      ref={containerRef}
      className="hero-effects-layer"
      aria-hidden="true"
    />
  );
}
