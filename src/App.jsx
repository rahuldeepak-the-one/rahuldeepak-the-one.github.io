import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
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
import { Bezel, PillButton, Reveal } from "./components/ui";

const SectionHeader = ({ eyebrow, title, linkLabel, linkHref, linkExternal }) => (
    <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-5">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="max-w-[18ch] font-display text-[clamp(36px,5.5vw,64px)] font-semibold leading-[1] tracking-[-0.045em] text-ink text-balance">
                {title}
            </h2>
        </div>
        {linkHref &&
            (linkExternal ? (
                <a
                    href={linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-blueink transition-colors duration-500 hover:text-ink"
                >
                    {linkLabel}
                </a>
            ) : (
                <Link to={linkHref} className="text-[14px] font-medium text-blueink transition-colors duration-500 hover:text-ink">
                    {linkLabel}
                </Link>
            ))}
    </Reveal>
);

const Section = ({ id, header, className = "", children }) => (
    <section id={id} className={`mx-auto w-full max-w-[1280px] scroll-mt-28 px-4 py-24 md:px-12 md:py-32 ${className}`}>
        <div className="flex flex-col gap-12 md:gap-16">
            {header}
            {children}
        </div>
    </section>
);

const education = [
    { k: "IIT Bombay", v: "B.Tech, Computer Science & Engineering", sub: "2021 – 2025", span: "md:col-span-5" },
    { k: "Entrance", v: "JEE Advanced AIR 709 · JEE Main AIR 157", sub: "NTSE Scholar", span: "md:col-span-4" },
    {
        k: "Certification",
        v: "Deep Learning Specialization",
        sub: "DeepLearning.AI · 2025 ↗",
        href: "https://coursera.org/verify/specialization/TIOE0Y7QDS0M",
        span: "md:col-span-3",
    },
];

const Education = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {education.map((row, i) => {
            const body = (
                <Bezel lift={!!row.href} className="h-full" coreClassName="flex flex-col gap-8 p-8">
                    <span className="eyebrow">{row.k}</span>
                    <div>
                        <p className="font-display text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">{row.v}</p>
                        <p className="mt-2 font-mono text-[12px] text-label">{row.sub}</p>
                    </div>
                </Bezel>
            );
            return (
                <Reveal key={row.k} delay={i * 0.08} className={row.span}>
                    {row.href ? (
                        <a href={row.href} target="_blank" rel="noopener noreferrer" className="block h-full rounded-[2rem]">
                            {body}
                        </a>
                    ) : (
                        body
                    )}
                </Reveal>
            );
        })}
    </div>
);

const ContactBlock = () => (
    <Reveal>
        <Bezel coreClassName="relative overflow-hidden px-8 py-16 md:px-16 md:py-24">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(47,79,224,0.14),rgba(47,79,224,0)_70%)]"
            ></div>
            <div className="relative flex flex-col gap-8">
                <span className="eyebrow eyebrow--accent">
                    <span className="live-dot" aria-hidden="true"></span>
                    Bengaluru · open to conversations
                </span>
                <h2 className="max-w-[20ch] font-display text-[clamp(32px,5vw,60px)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink text-balance">
                    GPU inference, video analytics &amp; ML systems roles.
                </h2>
                <div className="flex flex-wrap gap-3">
                    <PillButton href="mailto:rahuldeepak.k.11@gmail.com" icon="→">
                        Email me
                    </PillButton>
                    <PillButton href="https://www.linkedin.com/in/rahul-deepak-kuchipudi-b4322825a" variant="ghost" external>
                        LinkedIn
                    </PillButton>
                </div>
            </div>
        </Bezel>
    </Reveal>
);

const HomePage = () => {
    const location = useLocation();

    // land on the requested section after navigating home from another route
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

            <Section id="impact" className="!pt-0">
                <StatsBar />
            </Section>

            <Section id="experience" header={<SectionHeader eyebrow="01 · Experience" title="Shipping vision systems that run all day." />}>
                <Experience />
            </Section>

            <Section
                id="projects"
                header={
                    <SectionHeader
                        eyebrow="02 · Projects"
                        title="Things I built after hours."
                        linkLabel="All repositories ↗"
                        linkHref="https://github.com/rahuldeepak-the-one?tab=repositories"
                        linkExternal
                    />
                }
            >
                <Projects />
            </Section>

            <Section id="skills" header={<SectionHeader eyebrow="03 · Stack" title="Frames in, verdicts out." />}>
                <Skills />
            </Section>

            <Section id="education" header={<SectionHeader eyebrow="04 · Background" title="Education." />}>
                <Education />
            </Section>

            <Section
                id="notes"
                header={<SectionHeader eyebrow="05 · Notes" title="Field notes." linkLabel="All notes →" linkHref="/blog" />}
            >
                <Reveal>
                    <Bezel coreClassName="px-4 py-2 md:px-6">
                        <FieldNotes />
                    </Bezel>
                </Reveal>
            </Section>

            <Section id="contact">
                <ContactBlock />
            </Section>
        </>
    );
};

function App() {
    return (
        <div className="min-h-[100dvh]">
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
