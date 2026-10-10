import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const spring = [0.32, 0.72, 0, 1];

const items = [
    { id: "experience", label: "Work", type: "anchor" },
    { id: "projects", label: "Projects", type: "anchor" },
    { id: "stack", label: "Stack", type: "anchor" },
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
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/" || location.pathname === "";
    const isBlog = location.pathname.startsWith("/blog");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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
        ["hero", "experience", "projects", "stack", "notes", "contact"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [isHome]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleClick = (e, item) => {
        setIsOpen(false);
        if (item.type === "route") return;
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
            <nav
                className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
                    scrolled || isOpen ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent"
                }`}
            >
                <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
                    <Link
                        to="/"
                        onClick={(e) => {
                            if (isHome) {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em] text-ink"
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-ink font-mono text-[11px] font-semibold text-paper">
                            RD
                        </span>
                        Rahul Deepak
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {items.map((item) =>
                            renderLink(
                                item,
                                `relative rounded-md px-3 py-2 text-[14px] transition-colors duration-300 ${
                                    isActive(item) ? "text-ink" : "text-label hover:text-ink"
                                } ${isActive(item) ? "after:absolute after:inset-x-3 after:-bottom-[1px] after:h-[1.5px] after:bg-blueink" : ""}`
                            )
                        )}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 rounded-md bg-blueink px-3.5 py-2 text-[13px] font-medium text-on-accent transition-colors hover:bg-blueink-soft"
                        >
                            Resume
                        </a>
                    </div>

                    <div className="flex items-center gap-1 md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            className="relative flex h-9 w-9 items-center justify-center rounded-md hover:bg-ink/5"
                        >
                            <span
                                className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-300 ${
                                    isOpen ? "rotate-45" : "-translate-y-[4px]"
                                }`}
                            ></span>
                            <span
                                className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-300 ${
                                    isOpen ? "-rotate-45" : "translate-y-[4px]"
                                }`}
                            ></span>
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: spring }}
                        className="fixed inset-0 z-30 flex flex-col justify-center gap-1 bg-paper px-6 md:hidden"
                    >
                        {items.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, ease: spring, delay: 0.05 + i * 0.04 }}
                                className="border-b border-line"
                            >
                                {renderLink(
                                    item,
                                    "flex items-baseline justify-between py-4 font-display text-[32px] font-semibold tracking-[-0.03em] text-ink"
                                )}
                            </motion.div>
                        ))}
                        <motion.a
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 w-max rounded-md bg-blueink px-4 py-2.5 text-[14px] font-medium text-on-accent"
                        >
                            Resume ↗
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
