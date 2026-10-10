import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const spring = [0.32, 0.72, 0, 1];

const items = [
    { id: "experience", label: "Work", type: "anchor" },
    { id: "projects", label: "Projects", type: "anchor" },
    { id: "blog", label: "Notes", type: "route", href: "/blog" },
    { id: "contact", label: "Contact", type: "anchor" },
];

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/" || location.pathname === "";
    const isBlog = location.pathname.startsWith("/blog");

    // scroll-spy: highlight the section on screen
    useEffect(() => {
        if (!isHome) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                }
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );
        ["hero", "experience", "projects", "skills", "education", "notes", "contact"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [isHome]);

    // lock page scroll behind the full-screen menu
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleClick = (e, item) => {
        setIsOpen(false);
        if (item.type === "route") return; // Link handles navigation
        e.preventDefault();
        if (isHome) scrollToSection(item.id);
        else navigate("/", { state: { scrollTo: item.id } });
    };

    const isActive = (item) =>
        (item.type === "route" && isBlog) || (item.type === "anchor" && isHome && activeSection === item.id);

    const renderLink = (item, className) =>
        item.type === "route" ? (
            <Link key={item.id} to={item.href} onClick={(e) => handleClick(e, item)} className={className}>
                {item.label}
            </Link>
        ) : (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => handleClick(e, item)} className={className}>
                {item.label}
            </a>
        );

    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-5">
                <div className="flex w-full max-w-max items-center gap-2 rounded-full bg-white/70 p-1.5 pl-5 shadow-[0_0_0_1px_rgba(17,18,20,0.06),0_16px_40px_-16px_rgba(30,36,70,0.25)] backdrop-blur-xl max-md:w-full max-md:max-w-none max-md:justify-between">
                    <Link
                        to="/"
                        onClick={(e) => {
                            if (isHome) {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                            setIsOpen(false);
                        }}
                        className="mr-4 flex items-center gap-2 whitespace-nowrap text-[14px] font-semibold tracking-[-0.01em] text-ink"
                    >
                        <span className="live-dot" aria-hidden="true"></span>
                        Rahul Deepak
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {items.map((item) =>
                            renderLink(
                                item,
                                `rounded-full px-4 py-2 text-[14px] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                    isActive(item) ? "bg-ink text-white" : "text-body hover:bg-ink/5 hover:text-ink"
                                }`
                            )
                        )}
                    </div>

                    {/* hamburger → X morph */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 md:hidden"
                    >
                        <span
                            className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                isOpen ? "rotate-45" : "-translate-y-[4px]"
                            }`}
                        ></span>
                        <span
                            className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                isOpen ? "-rotate-45" : "translate-y-[4px]"
                            }`}
                        ></span>
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: spring }}
                        className="fixed inset-0 z-30 flex flex-col justify-center bg-paper/85 px-8 backdrop-blur-3xl md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {items.map((item, i) => (
                                <div key={item.id} className="overflow-hidden">
                                    <motion.div
                                        initial={{ y: 48, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 24, opacity: 0 }}
                                        transition={{ duration: 0.7, ease: spring, delay: 0.1 + i * 0.05 }}
                                    >
                                        {renderLink(
                                            item,
                                            "block py-2 font-display text-[44px] font-semibold tracking-[-0.04em] text-ink"
                                        )}
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
