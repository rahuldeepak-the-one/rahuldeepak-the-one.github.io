import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const [emailCopied, setEmailCopied] = useState(false);
    const email = "rahuldeepak.k.11@gmail.com";

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Brand */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        <span className="text-[var(--color-orange)]">$</span> rahul_deepak
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Building systems that scale.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-6 items-center">
                    <a href="https://github.com/rahuldeepak-the-one" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[var(--color-orange)] transition-colors">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/rahul-deepak-kuchipudi-b4322825a" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[var(--color-orange)] transition-colors">
                        <FaLinkedin size={24} />
                    </a>
                    <button
                        onClick={copyEmail}
                        className="group flex items-center gap-2 text-slate-400 hover:text-[var(--color-orange)] transition-colors"
                    >
                        <FaEnvelope size={24} />
                        <span className="text-sm font-medium">
                            {emailCopied ? "Copied!" : email}
                        </span>
                    </button>
                </div>

                {/* Copyright */}
                <div className="text-slate-500 text-xs text-center md:text-right">
                    <p>&copy; {new Date().getFullYear()} Rahul Deepak Kuchipudi.</p>
                    <p className="mt-1">Designed with <span className="text-[var(--color-orange)]">Ubuntu Orange</span>.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
