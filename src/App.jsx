import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar.jsx";
import CustomCursor from "./components/layout/CustomCursor.jsx";
import Hero from "./components/sections/Hero.jsx";

const About = lazy(() => import("./components/sections/About.jsx"));
const CodingStats = lazy(() => import("./components/sections/CodingStats.jsx"));
const Projects = lazy(() => import("./components/sections/Projects.jsx"));
const InProgress = lazy(() => import("./components/sections/InProgress.jsx"));
const Certifications = lazy(() => import("./components/sections/Certifications.jsx"));
const Contact = lazy(() => import("./components/sections/Contact.jsx"));

function SectionLoader() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "50vh" }}
    >
      <div
        className="w-6 h-6 rounded-full"
        style={{
          border: "2px solid var(--c-glass-border)",
          borderTopColor: "var(--c-orange)",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
          <InProgress />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <CodingStats />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Certifications />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
    </>
  );
}
