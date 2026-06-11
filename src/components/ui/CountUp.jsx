import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) {
  const ref = useRef(null);
  const numRef = useRef({ val: 0 });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(numRef.current, {
        val: end,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          const v = numRef.current.val;
          setDisplay(`${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.round(v)}${suffix}`);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, duration, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
