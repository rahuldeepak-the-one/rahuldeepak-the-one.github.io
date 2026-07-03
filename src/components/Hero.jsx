import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy, FaFileDownload, FaTrophy, FaGraduationCap } from "react-icons/fa";
import profileAvatar from "../assets/profile_avatar.png";

const roles = [
    "Software Development Engineer @ Avathon",
    "Computer Science @ IIT Bombay",
    "AI/ML & CV Specialist",
    "Edge AI Pipeline Engineer",
];

const pipelineStages = ["rtsp://cam0", "nvinfer", "nvtracker", "vlm", "insight"];

const achievements = [
    { icon: FaTrophy, label: "JEE Main AIR", value: "157" },
    { icon: FaTrophy, label: "JEE Advanced AIR", value: "709" },
    { icon: FaGraduationCap, label: "IIT Bombay", value: "CSE" },
];

const Hero = () => {
    const prefersReducedMotion = useReducedMotion();
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const email = "rahuldeepak.k.11@gmail.com";

    useEffect(() => {
        // Reduced motion: no typewriter — show each role fully, rotate slowly
        if (prefersReducedMotion) {
            setText(roles[roleIndex]);
            const timeout = setTimeout(() => {
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }, 5000);
            return () => clearTimeout(timeout);
        }

        const currentRole = roles[roleIndex];
        const typeSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting && charIndex < currentRole.length) {
                setText(currentRole.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            } else if (isDeleting && charIndex > 0) {
                setText(currentRole.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
            } else if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }
        }, typeSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, roleIndex, prefersReducedMotion]);

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    const socialButtonClass =
        "group px-5 py-3 border border-[var(--color-edge)] bg-[var(--color-panel)]/60 text-white rounded hover:border-[var(--color-orange)] transition-colors flex items-center gap-2";

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden">
            {/* Background terminal effect hint */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-panel)_0%,_transparent_70%)]"></div>

            <div className="max-w-5xl mx-auto w-full z-10 pt-24 pb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                    {/* Profile Picture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="shrink-0"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-br from-[var(--color-orange)] via-orange-400 to-amber-500 rounded-full opacity-40 blur-md"></div>
                            <img
                                src={profileAvatar}
                                alt="Rahul Deepak"
                                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-[var(--color-edge)]"
                            />
                            {/* Online status dot */}
                            <div
                                className="absolute bottom-2 right-2 w-4 h-4 bg-[var(--color-signal)] rounded-full border-2 border-[var(--color-void)]"
                                role="img"
                                aria-label="Currently available"
                                title="Currently available"
                            ></div>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <p className="terminal-prefix text-[var(--color-orange)] font-medium mb-4 text-lg">
                            Initialize portfolio...
                        </p>

                        <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] font-bold text-white mb-6 tracking-tight">
                            Kuchipudi Rahul Deepak
                        </h1>

                        <div className="min-h-16 md:min-h-20 mb-6 text-xl sm:text-2xl md:text-3xl text-[var(--color-dim)] font-medium">
                            <span className="terminal-prefix-gt text-[var(--color-orange)] mr-2"></span>
                            {text}
                            <span className="animate-pulse text-[var(--color-orange)]" aria-hidden="true">_</span>
                        </div>

                        {/* Signature: GStreamer pipeline strip */}
                        <div className="mb-8" aria-label="Video analytics pipeline: RTSP camera to inference to tracking to vision-language model to insight">
                            <p className="text-xs text-[var(--color-dim)]/70 mb-2 font-mono" aria-hidden="true">
                                # gst-launch-1.0
                            </p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 justify-center md:justify-start font-mono text-xs sm:text-sm" aria-hidden="true">
                                {pipelineStages.map((stage, i) => (
                                    <span key={stage} className="contents">
                                        {i > 0 && <span className="text-[var(--color-orange)] font-bold">!</span>}
                                        <span
                                            className="pipe-stage px-2.5 py-1 rounded bg-[var(--color-panel)]/50"
                                            style={{ animationDelay: `${i * 0.6}s` }}
                                        >
                                            {stage}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Achievement Badges */}
                        <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
                            {achievements.map((badge) => (
                                <div
                                    key={badge.label}
                                    className="flex items-center gap-2 px-4 py-2 border border-[var(--color-edge)] bg-[var(--color-panel)]/50 rounded text-sm text-slate-300"
                                >
                                    <badge.icon className="text-[var(--color-orange)]" aria-hidden="true" />
                                    {badge.label} <span className="text-white font-bold">{badge.value}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-[var(--color-dim)] max-w-2xl text-lg mb-10 leading-relaxed">
                            Building high-performance edge AI systems and scalable inference pipelines.
                            Currently architecting modular video analytics at Avathon with DeepStream &amp; Triton.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a
                                href="#projects"
                                className="px-8 py-3 bg-[var(--color-orange)] text-white font-bold rounded hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                            >
                                View Projects
                            </a>

                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialButtonClass}
                            >
                                <FaFileDownload className="text-slate-400 group-hover:text-[var(--color-orange)] transition-colors" aria-hidden="true" />
                                Resume
                            </a>

                            <a
                                href="https://github.com/rahuldeepak-the-one"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialButtonClass}
                            >
                                <FaGithub className="text-slate-400 group-hover:text-[var(--color-orange)] transition-colors" aria-hidden="true" />
                                GitHub
                            </a>

                            <a
                                href="https://www.linkedin.com/in/rahul-deepak-kuchipudi-b4322825a"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialButtonClass}
                            >
                                <FaLinkedin className="text-slate-400 group-hover:text-[var(--color-orange)] transition-colors" aria-hidden="true" />
                                LinkedIn
                            </a>

                            <button onClick={copyEmail} className={socialButtonClass}>
                                <FaEnvelope className="text-slate-400 group-hover:text-[var(--color-orange)] transition-colors" aria-hidden="true" />
                                {emailCopied ? "Copied!" : "Copy Email"}
                                {emailCopied ? null : <FaCopy className="text-xs text-slate-500" aria-hidden="true" />}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
