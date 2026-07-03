import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import StatsBar from "./components/StatsBar";
import SystemLog from "./components/SystemLog";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import BlogAdmin from "./components/BlogAdmin";

const Section = ({ id, title, children, className = "" }) => (
    <section id={id} className={`min-h-[50vh] py-20 px-6 scroll-mt-24 ${className}`}>
        <div className="max-w-7xl mx-auto">
            <h2 className="terminal-prefix font-display text-3xl md:text-4xl font-bold mb-12 text-[var(--color-orange)]">
                {title}
            </h2>
            {children}
        </div>
    </section>
);

const HomePage = () => (
    <>
        <Hero />

        {/* Live system-log ticker */}
        <SystemLog />

        {/* Animated Stats */}
        <div className="max-w-7xl mx-auto px-6">
            <StatsBar />
        </div>

        <Section id="experience" title="Experience">
            <Experience />
        </Section>

        <Section id="projects" title="Projects">
            <Projects />
        </Section>

        <Section id="skills" title="Skill Matrix">
            <Skills />
        </Section>

        <Section id="contact" title="Connect">
            <div className="text-center max-w-2xl mx-auto">
                <p className="text-xl text-slate-300 mb-3">
                    Open to opportunities in AI/ML and Systems Engineering.
                </p>
                <p className="text-sm font-mono text-[var(--color-dim)] mb-8">
                    <span className="text-[var(--color-signal)]">[&nbsp;&nbsp;OK&nbsp;&nbsp;]</span> contact channel open
                </p>
                <a
                    href="mailto:rahuldeepak.k.11@gmail.com"
                    className="inline-block px-8 py-3 bg-[var(--color-panel)] border border-[var(--color-orange)] text-[var(--color-orange)] font-bold rounded hover:bg-[var(--color-orange)] hover:text-white transition-all duration-300"
                >
                    Email me
                </a>
            </div>
        </Section>
    </>
);

function App() {
    return (
        <div className="antialiased min-h-screen relative">
            <ParticleBackground />
            <Navbar />

            <main className="relative z-10">
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
