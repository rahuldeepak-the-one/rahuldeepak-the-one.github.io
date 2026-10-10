import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import FieldNotes from "./components/FieldNotes";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import BlogAdmin from "./components/BlogAdmin";

const reveal = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, ease: "easeOut" },
};

const Section = ({ id, className = "", children }) => (
    <motion.section {...reveal} id={id} className={`mx-auto w-full max-w-[1200px] scroll-mt-20 px-6 md:px-14 ${className}`}>
        {children}
    </motion.section>
);

const Eyebrow = ({ children }) => <span className="font-mono text-[11px] tracking-[1px] text-accent">{children}</span>;

const plainJobs = [
    {
        k: "See",
        h: "Video pipelines on the GPU",
        p: "Software that takes live camera feeds and finds people, vehicles and events in them, fast enough to run 99 cameras on one graphics card.",
        n: "99 cameras · 1 GPU",
    },
    {
        k: "Understand",
        h: "Vision-language models",
        p: "A model that looks at what the cameras caught and describes it in plain language, so an alert says what happened, not just that something moved.",
        n: "0.41 s per verdict",
    },
    {
        k: "Ship",
        h: "Systems that hold up",
        p: "Profiling, plugins, queues and deploy pipelines, so all of it keeps running on real hardware at real sites.",
        n: "15% → 98% alerts delivered",
    },
];

const PlainWords = () => (
    <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
            <Eyebrow>WHAT I DO, IN PLAIN WORDS</Eyebrow>
            <h2 className="max-w-[760px] font-display text-[32px] font-bold leading-[1.2] tracking-[-1px] text-white">
                Three jobs, one system: see the video, understand it, keep it running.
            </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {plainJobs.map((job) => (
                <div key={job.k} className="flex flex-col gap-2.5 border-t border-line-2 pt-5">
                    <span className="font-mono text-[12px] font-bold text-accent">{job.k}</span>
                    <h3 className="font-display text-[19px] font-semibold text-white">{job.h}</h3>
                    <p className="text-[16px] leading-[1.65] text-soft">{job.p}</p>
                    <span className="text-[14px] font-semibold text-white">{job.n}</span>
                </div>
            ))}
        </div>
    </div>
);

const Education = () => (
    <div className="flex flex-col gap-[14px]">
        <Eyebrow>EDUCATION</Eyebrow>
        <span className="font-display text-[18px] font-semibold text-white">IIT Bombay — B.Tech, Computer Science</span>
        <span className="text-[15px] leading-[1.6] text-soft">
            2021–2025 · JEE Advanced AIR 709 · JEE Main AIR 157 · NTSE Scholar ·{" "}
            <a
                href="https://coursera.org/verify/specialization/TIOE0Y7QDS0M"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent/50 underline-offset-4 hover:text-white"
            >
                Deep Learning Specialization, DeepLearning.AI
            </a>
        </span>
    </div>
);

const Contact = () => (
    <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
            <Eyebrow>NEXT</Eyebrow>
            <p className="max-w-[640px] font-display text-[clamp(26px,4vw,34px)] font-bold leading-[1.2] tracking-[-1px] text-white">
                Open to GPU inference, video analytics and ML systems roles.
            </p>
        </div>
        <a
            href="mailto:rahuldeepak.k.11@gmail.com"
            className="border-b border-accent pb-[3px] text-[16px] font-semibold text-white transition-colors hover:text-accent"
        >
            rahuldeepak.k.11@gmail.com →
        </a>
    </div>
);

const HomePage = () => {
    const location = useLocation();

    // land on the requested sheet after navigating home from another route
    useEffect(() => {
        const target = location.state?.scrollTo;
        if (!target) return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        requestAnimationFrame(() => {
            document.getElementById(target)?.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start",
            });
        });
    }, [location.state]);

    return (
        <>
            <Hero />

            <Section id="about" className="pt-20">
                <PlainWords />
            </Section>

            <StatsBar />

            <Section id="experience" className="pt-24">
                <Experience />
            </Section>

            <Section id="projects" className="pt-24">
                <Projects />
            </Section>

            <Section id="skills" className="pt-24">
                <Skills />
            </Section>

            <Section id="notes" className="grid grid-cols-1 gap-12 pt-20 md:grid-cols-2">
                <Education />
                <FieldNotes />
            </Section>

            <Section id="contact" className="pb-14 pt-28">
                <Contact />
            </Section>
        </>
    );
};

function App() {
    return (
        <div className="min-h-screen bg-night text-star antialiased">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/admin" element={<BlogAdmin />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
