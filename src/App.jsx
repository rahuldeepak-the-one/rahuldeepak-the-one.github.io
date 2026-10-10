import { useEffect, useState } from "react";
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
import { Button, Panel, Reveal } from "./components/ui";

const SectionHeader = ({ index, eyebrow, title, linkLabel, linkHref, linkExternal }) => (
    <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
            <span className="eyebrow">
                <span className="text-blueink">{index}</span> {eyebrow}
            </span>
            <h2 className="max-w-[22ch] font-display text-[clamp(28px,3.6vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink text-balance">
                {title}
            </h2>
        </div>
        {linkHref &&
            (linkExternal ? (
                <a href={linkHref} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-label transition-colors hover:text-blueink">
                    {linkLabel}
                </a>
            ) : (
                <Link to={linkHref} className="font-mono text-[13px] text-label transition-colors hover:text-blueink">
                    {linkLabel}
                </Link>
            ))}
    </Reveal>
);

const Section = ({ id, header, className = "", children }) => (
    <section id={id} className={`mx-auto w-full max-w-[1200px] scroll-mt-20 px-5 py-16 md:px-10 md:py-24 ${className}`}>
        <div className="flex flex-col gap-10">
            {header}
            {children}
        </div>
    </section>
);

const EMAIL = "rahuldeepak.k.11@gmail.com";

const ContactBlock = () => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };
    return (
        <Reveal>
            <Panel frame className="px-6 py-12 md:px-14 md:py-16">
                <div className="flex flex-col gap-7">
                    <span className="eyebrow">
                        <span className="live-dot" aria-hidden="true"></span>
                        Bengaluru · open to conversations
                    </span>
                    <h2 className="max-w-[24ch] font-display text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink text-balance">
                        Working on GPU inference, video analytics or ML systems? Let&rsquo;s talk.
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={copy}
                            className="group inline-flex items-center gap-3 rounded-md bg-sunken px-4 py-2.5 font-mono text-[14px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:text-blueink"
                            aria-label={`Copy email address ${EMAIL}`}
                        >
                            {EMAIL}
                            <span className="text-[12px] text-label group-hover:text-blueink">{copied ? "copied ✓" : "copy"}</span>
                        </button>
                        <Button href={`mailto:${EMAIL}`} icon="→">Email me</Button>
                        <Button href="https://www.linkedin.com/in/rahul-deepak-kuchipudi-b4322825a" variant="ghost" external icon="↗">LinkedIn</Button>
                        <Button href="/resume.pdf" variant="ghost" external icon="↗">Resume</Button>
                    </div>
                </div>
            </Panel>
        </Reveal>
    );
};

const HomePage = () => {
    const location = useLocation();

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

            <section id="impact" className="mx-auto w-full max-w-[1200px] px-5 md:px-10">
                <StatsBar />
            </section>

            <Section id="experience" header={<SectionHeader index="01" eyebrow="Experience" title="Shipping vision systems that run all day." />}>
                <Experience />
            </Section>

            <Section
                id="projects"
                header={
                    <SectionHeader
                        index="02"
                        eyebrow="Projects"
                        title="Things I built after hours."
                        linkLabel="All repositories ↗"
                        linkHref="https://github.com/rahuldeepak-the-one?tab=repositories"
                        linkExternal
                    />
                }
            >
                <Projects />
            </Section>

            <Section id="stack" header={<SectionHeader index="03" eyebrow="Stack & background" title="Frames in, verdicts out." />}>
                <Skills />
            </Section>

            <Section id="notes" header={<SectionHeader index="04" eyebrow="Notes" title="Field notes." linkLabel="All notes →" linkHref="/blog" />}>
                <Reveal>
                    <FieldNotes />
                </Reveal>
            </Section>

            <Section id="contact" className="!pt-0">
                <ContactBlock />
            </Section>
        </>
    );
};

function App() {
    return (
        <div className="min-h-[100dvh] bg-paper">
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
