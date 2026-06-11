import BlurReveal from "../ui/BlurReveal.jsx";
import TiltCard from "../ui/TiltCard.jsx";
import CountUp from "../ui/CountUp.jsx";
import { codingPlatforms } from "../../data/coding.js";

function PlatformIcon({ platform }) {
  if (platform === "LeetCode") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--c-orange)" }}>
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    );
  }
  if (platform === "Codeforces") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#1F8ACB" }}>
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
      </svg>
    );
  }
  // CodeChef
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#5B4638" }}>
      <path d="M11.257.004c-.387.02-.723.146-.945.397-.377.424-.312.953-.312 1.467v.313c-.528.146-.949.505-1.094 1.047-.13.487-.003.93.29 1.3-.501.365-.83.954-.83 1.622 0 .453.157.877.416 1.213-.352.37-.577.867-.577 1.419 0 1.12.903 2.027 2.02 2.027h3.553c1.117 0 2.02-.907 2.02-2.027 0-.552-.225-1.049-.577-1.42.26-.335.416-.759.416-1.212 0-.668-.33-1.257-.83-1.622.293-.37.42-.813.29-1.3-.145-.542-.566-.9-1.094-1.047v-.313c0-.514.065-1.043-.312-1.467C13.327.063 12.78-.025 12.257.004c-.32.018-.672.003-1 0zM5.762 11.5c-.21.006-.452.093-.65.319-.82.933-.328 2.46.69 3.922.76 1.09 2.09 2.29 3.78 2.92-.09.3-.08.62.05.92.39.9 1.37 1.35 2.35 1.12-.05.41.04.84.29 1.23.66 1.02 2.01 1.32 3.03.66l.07-.05c.31.32.73.51 1.2.51.94 0 1.7-.76 1.7-1.7 0-.7-.42-1.3-1.03-1.56.15-.26.21-.58.15-.91-.12-.65-.71-1.1-1.36-1.09-.13-.41-.45-.75-.88-.93l.04-.01c.57-.44.81-1.2.53-1.87-.28-.66-.95-1.06-1.65-.96-.38-.61-1.11-.88-1.78-.66-.36-.28-.83-.37-1.27-.22-.35-.55-.97-.83-1.62-.72-.23-.2-.51-.32-.82-.36.06-.48-.13-.97-.54-1.3-.42-.34-1.01-.35-1.43-.04a1.1 1.1 0 0 0-.8.06c-.46-.5-1.15-.73-1.75-.7-.36.02-.79.11-1.09.44l-.08.09c-.33-.11-.66-.16-.89-.15zM3.59 12.96a.72.72 0 0 0-.44.17c-.32.25-.46.72-.15 1.15.17.24.55.58.93.9.1-.53.27-1.07.54-1.59.08-.15.11-.26.06-.36a.7.7 0 0 0-.93-.27z" />
    </svg>
  );
}

export default function CodingStats() {
  const featured = codingPlatforms.find((p) => p.featured);
  const others = codingPlatforms.filter((p) => !p.featured);

  return (
    <section id="coding" className="section-padding relative">
      <div className="section-max">
        <BlurReveal>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}
          >
            Competitive Programming
          </p>
          <h2
            className="text-section-title mb-16"
            style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
          >
            Solving problems
            <br />
            <span style={{ color: "var(--c-muted)" }}>for fun</span>
          </h2>
        </BlurReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured: LeetCode — larger card */}
          {featured && (
            <BlurReveal className="lg:col-span-2">
              <TiltCard className="p-8 md:p-10 h-full" intensity={8}>
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <PlatformIcon platform={featured.platform} />
                    <div>
                      <h3
                        className="text-xl font-semibold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
                      >
                        {featured.platform}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        @{featured.handle}
                      </p>
                    </div>
                  </div>
                  <a
                    href={featured.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-pill hover:border-[var(--c-orange)]"
                    style={{ textDecoration: "none" }}
                    data-hoverable
                  >
                    View Profile →
                  </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {featured.stats.map((stat) => (
                    <div key={stat.label}>
                      <p
                        className="text-3xl md:text-4xl font-light mb-1"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
                      >
                        <CountUp
                          end={stat.value}
                          prefix={stat.prefix || ""}
                          suffix={stat.suffix || ""}
                        />
                      </p>
                      <p
                        className="text-xs uppercase tracking-wider"
                        style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* LeetCode breakdown bar */}
                {featured.breakdown && (
                  <div className="mt-8">
                    <div className="flex gap-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--c-glass-bg)" }}>
                      <div
                        className="rounded-full"
                        style={{
                          width: `${(featured.breakdown.easy / (featured.breakdown.easy + featured.breakdown.medium + featured.breakdown.hard)) * 100}%`,
                          background: "var(--c-green)",
                        }}
                      />
                      <div
                        className="rounded-full"
                        style={{
                          width: `${(featured.breakdown.medium / (featured.breakdown.easy + featured.breakdown.medium + featured.breakdown.hard)) * 100}%`,
                          background: "var(--c-orange)",
                        }}
                      />
                      <div
                        className="rounded-full"
                        style={{
                          width: `${(featured.breakdown.hard / (featured.breakdown.easy + featured.breakdown.medium + featured.breakdown.hard)) * 100}%`,
                          background: "#EF4444",
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs" style={{ color: "var(--c-green)", fontFamily: "var(--font-mono)" }}>
                        Easy {featured.breakdown.easy}
                      </span>
                      <span className="text-xs" style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}>
                        Medium {featured.breakdown.medium}
                      </span>
                      <span className="text-xs" style={{ color: "#EF4444", fontFamily: "var(--font-mono)" }}>
                        Hard {featured.breakdown.hard}
                      </span>
                    </div>
                  </div>
                )}
              </TiltCard>
            </BlurReveal>
          )}

          {/* Other platforms */}
          <div className="flex flex-col gap-6">
            {others.map((platform, i) => (
              <BlurReveal key={platform.platform} delay={i * 0.1}>
                <TiltCard className="p-6 h-full" intensity={10}>
                  <div className="flex items-center gap-3 mb-6">
                    <PlatformIcon platform={platform.platform} />
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
                      >
                        {platform.platform}
                      </h3>
                      {platform.rank && (
                        <span
                          className="text-xs"
                          style={{ color: "var(--c-orange)", fontFamily: "var(--font-mono)" }}
                        >
                          {platform.rank}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {platform.stats.slice(0, 4).map((stat) => (
                      <div key={stat.label}>
                        <p
                          className="text-xl font-light"
                          style={{ fontFamily: "var(--font-heading)", color: "var(--c-text)" }}
                        >
                          <CountUp
                            end={stat.value}
                            prefix={stat.prefix || ""}
                            suffix={stat.suffix || ""}
                          />
                        </p>
                        <p
                          className="text-[10px] uppercase tracking-wider"
                          style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)" }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </BlurReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
