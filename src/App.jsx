import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import FieldNotes from "./components/FieldNotes";
import Footer from "./components/Footer";
import SelfDetect from "./components/SelfDetect";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import BlogAdmin from "./components/BlogAdmin";

const reveal = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, ease: "easeOut" },
};

const SectionHeader = ({ title, tag, tagHref, tagExternal }) => (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-[30px] font-extrabold tracking-[-1px] text-ink">{title}</h2>
        {tagHref ? (
            tagExternal ? (
                <a
                    href={tagHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-blueink transition-colors hover:text-blueink-soft"
                >
                    {tag}
                </a>
            ) : (
                <Link to={tagHref} className="font-mono text-[11px] text-blueink transition-colors hover:text-blueink-soft">
                    {tag}
                </Link>
            )
        ) : (
            <span className="font-mono text-[11px] text-blueink">{tag}</span>
        )}
    </div>
);

const Section = ({ id, header, className = "", children }) => (
    <motion.section {...reveal} id={id} className={`mx-auto w-full max-w-[1200px] scroll-mt-20 px-6 md:px-12 ${className}`}>
        <div className="flex flex-col gap-7">
            {header}
            {children}
        </div>
    </motion.section>
);

const education = [
    { k: "IIT Bombay", v: "B.Tech, Computer Science & Engineering · 2021–2025" },
    { k: "JEE", v: "Advanced AIR 709 · Main AIR 157 · NTSE Scholar" },
    { k: "Certification", v: "Deep Learning Specialization — DeepLearning.AI (2025)", href: "https://coursera.org/verify/specialization/TIOE0Y7QDS0M" },
];

const Education = () => (
    <dl className="grid grid-cols-1 gap-x-6 border-t border-blueink/25 sm:grid-cols-[160px_1fr]">
        {education.map((row) => (
            <div key={row.k} className="contents">
                <dt className="pt-4 font-mono text-[11px] text-label sm:border-b sm:border-blueink/15 sm:pb-4">{row.k.toUpperCase()}</dt>
                <dd className="border-b border-blueink/15 pb-4 pt-1 text-[15px] text-ink sm:pt-4">
                    {row.href ? (
                        <a href={row.href} target="_blank" rel="noopener noreferrer" className="underline decoration-blueink/40 underline-offset-4 hover:text-blueink">
                            {row.v}
                        </a>
                    ) : (
                        row.v
                    )}
                </dd>
            </div>
        ))}
    </dl>
);

const ContactBlock = () => (
    <div className="grid grid-cols-1 border-[1.5px] border-blueink bg-white sm:grid-cols-[1fr_auto]">
        <div className="border-b border-blueink/35 px-8 py-7 sm:border-b-0 sm:border-r">
            <p className="mb-2 font-mono text-[11px] text-label">
                DRAWN BY: R.D. KUCHIPUDI · CHECKED BY: 99 STREAMS / ONE GPU · SCALE: 2.7× / 4.7× / 98%
            </p>
            <p className="font-display text-[24px] font-extrabold text-ink text-balance">
                Open to GPU inference, video analytics &amp; ML systems roles.
            </p>
        </div>
        <a
            href="mailto:rahuldeepak.k.11@gmail.com"
            className="flex items-center bg-blueink px-10 py-7 font-mono text-[13px] font-bold text-white transition-colors hover:bg-blueink-soft"
        >
            APPROVE → EMAIL ME
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
            <StatsBar />

            <Section
                id="experience"
                className="pt-14"
                header={<SectionHeader title="Experience" tag="SECTION A — REVISION HISTORY" />}
            >
                <Experience />
            </Section>

            <Section
                id="projects"
                className="pt-14"
                header={
                    <SectionHeader
                        title="Projects"
                        tag="SECTION B — SCHEMATICS · ALL FROM GITHUB ↗"
                        tagHref="https://github.com/rahuldeepak-the-one?tab=repositories"
                        tagExternal
                    />
                }
            >
                <Projects />
            </Section>

            <Section
                id="skills"
                className="pt-14"
                header={<SectionHeader title="Skill Schematic" tag="SECTION C — SIGNAL PATH" />}
            >
                <Skills />
            </Section>

            <Section
                id="education"
                className="pt-14"
                header={<SectionHeader title="Credentials" tag="SECTION D — CERTIFIED BY" />}
            >
                <Education />
            </Section>

            <Section
                id="notes"
                className="pt-14"
                header={<SectionHeader title="Field Notes" tag="SECTION E — BLOG · ALL NOTES →" tagHref="/blog" />}
            >
                <FieldNotes />
            </Section>

            <Section id="contact" className="py-14">
                <ContactBlock />
            </Section>
        </>
    );
};

function App() {
    return (
        <div className="min-h-screen antialiased">
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
            <SelfDetect />
        </div>
    );
}

export default App;
