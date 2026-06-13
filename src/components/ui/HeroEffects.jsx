import { useEffect, useRef, useCallback } from "react";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function HeroEffects() {
  const containerRef = useRef(null);
  const rippleTimerRef = useRef(null);
  const particleTimerRef = useRef(null);

  const spawnRipple = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const ripple = document.createElement("div");
    ripple.className = "hero-ripple";
    ripple.style.left = `${randomBetween(10, 90)}%`;
    ripple.style.top = `${randomBetween(10, 90)}%`;
    ripple.style.animationDuration = `${randomBetween(1.8, 2.8)}s`;

    container.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());

    rippleTimerRef.current = setTimeout(spawnRipple, randomBetween(1200, 2500));
  }, []);

  const spawnParticle = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const particle = document.createElement("div");
    particle.className = "hero-particle";
    particle.style.left = `${randomBetween(5, 95)}%`;
    particle.style.bottom = `${randomBetween(5, 40)}%`;
    particle.style.width = `${randomBetween(2.5, 5)}px`;
    particle.style.height = particle.style.width;
    particle.style.setProperty("--drift", `${randomBetween(-40, 40)}px`);
    particle.style.animationDuration = `${randomBetween(3, 6)}s`;

    container.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());

    particleTimerRef.current = setTimeout(spawnParticle, randomBetween(400, 1200));
  }, []);

  useEffect(() => {
    rippleTimerRef.current = setTimeout(spawnRipple, 600);
    particleTimerRef.current = setTimeout(spawnParticle, 300);

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
