import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy } from "react-icons/fa";
import profileAvatar from "../assets/profile_avatar.png";

const roles = [
    "Software Development Engineer @ Avathon",
    "Computer Science @ IIT Bombay",
    "AI/ML & CV Specialist",
    "Edge AI Pipeline Architect",
];

const Hero = () => {
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const email = "rahuldeepak.k.11@gmail.com";

    useEffect(() => {
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
    }, [charIndex, isDeleting, roleIndex]);

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden">
            {/* Background terminal effect hint */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-slate-card)_0%,_transparent_70%)]"></div>

            <div className="max-w-5xl mx-auto w-full z-10 pt-20">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                    {/* Profile Picture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="shrink-0"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-br from-[var(--color-orange)] via-orange-400 to-amber-500 rounded-full opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-500"></div>
                            <img
                                src={profileAvatar}
                                alt="Rahul Deepak"
                                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-slate-700 group-hover:border-[var(--color-orange)] transition-colors duration-300"
                            />
                            {/* Online status dot */}
                            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
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

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Kuchipudi Rahul Deepak
                        </h1>

                        <div className="h-12 md:h-16 mb-8 text-2xl md:text-4xl text-slate-400 font-medium">
                            <span className="terminal-prefix-gt text-[var(--color-orange)] mr-2"></span>
                            {text}
                            <span className="animate-pulse text-[var(--color-orange)]">_</span>
                        </div>

                        {/* Achievement Badges */}
                        <div className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start">
                            <div className="px-4 py-2 border border-slate-700 bg-slate-800/50 rounded text-sm text-slate-300 hover:border-[var(--color-orange)] transition-colors cursor-default">
                                🏆 JEE Main AIR <span className="text-white font-bold">157</span>
                            </div>
                            <div className="px-4 py-2 border border-slate-700 bg-slate-800/50 rounded text-sm text-slate-300 hover:border-[var(--color-orange)] transition-colors cursor-default">
                                🏆 JEE Advanced AIR <span className="text-white font-bold">709</span>
                            </div>
                            <div className="px-4 py-2 border border-slate-700 bg-slate-800/50 rounded text-sm text-slate-300 hover:border-[var(--color-orange)] transition-colors cursor-default">
                                🎓 IIT Bombay <span className="text-white font-bold">CSE</span>
                            </div>
                        </div>

                        <p className="text-slate-400 max-w-2xl text-lg mb-10 leading-relaxed">
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
                                href="https://github.com/rahuldeepak-the-one"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-6 py-3 border border-slate-700 bg-slate-800/50 text-white rounded hover:border-[var(--color-orange)] transition-colors flex items-center gap-2"
                            >
                                <FaGithub className="text-slate-400 group-hover:text-[var(--color-orange)] transition-colors" />
                                GitHub
                            </a>

                            <button
                                onClick={copyEmail}
                                className="group px-6 py-3 border border-slate-700 bg-slate-800/50 text-white rounded hover:border-[var(--color-orange)] transition-colors flex items-center gap-2"
                            >
                                <FaEnvelope className="text-slate-400 group-hover:text-[var(--color-orange)] transition-colors" />
                                {emailCopied ? "Copied!" : "Copy Email"}
                                {emailCopied ? null : <FaCopy className="text-xs text-slate-500" />}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
