import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sheets = [
    { id: "experience", label: "SHEET 1: WORK", type: "anchor" },
    { id: "projects", label: "2: PROJECTS", type: "anchor" },
    { id: "blog", label: "3: BLOG", type: "route", href: "/blog" },
    { id: "contact", label: "4: CONTACT", type: "anchor", accent: true },
];

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("experience");
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/" || location.pathname === "";
    const isBlog = location.pathname.startsWith("/blog");

    // scroll-spy: highlight the sheet whose section is on screen
    useEffect(() => {
        if (!isHome) return undefined;
        const ids = ["experience", "projects", "contact"];
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                }
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [isHome]);

    const handleSheetClick = (e, sheet) => {
        if (sheet.type === "route") {
            setIsOpen(false);
            return; // Link handles navigation
        }
        e.preventDefault();
        setIsOpen(false);
        if (isHome) {
            scrollToSection(sheet.id);
        } else {
            navigate("/", { state: { scrollTo: sheet.id } });
        }
    };

    const sheetClass = (sheet) => {
        const base = "font-mono text-[12px] tracking-wide transition-colors";
        if (sheet.accent) return `${base} font-bold text-blueink hover:text-blueink-soft`;
        const active =
            (sheet.type === "route" && isBlog) ||
            (sheet.type === "anchor" && isHome && activeSection === sheet.id);
        return active
            ? `${base} border-b-2 border-blueink pb-0.5 text-ink`
            : `${base} text-label hover:text-ink`;
    };

    const renderSheet = (sheet) =>
        sheet.type === "route" ? (
            <Link key={sheet.id} to={sheet.href} onClick={(e) => handleSheetClick(e, sheet)} className={sheetClass(sheet)}>
                {sheet.label}
            </Link>
        ) : (
            <a key={sheet.id} href={`#${sheet.id}`} onClick={(e) => handleSheetClick(e, sheet)} className={sheetClass(sheet)}>
                {sheet.label}
            </a>
        );

    return (
        <nav className="sticky top-0 z-50 border-b border-blueink/35 bg-paper/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-12 md:py-5">
                <Link
                    to="/"
                    onClick={(e) => {
                        if (isHome) {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                        setIsOpen(false);
                    }}
                    className="whitespace-nowrap font-mono text-[13px] font-bold text-blueink hover:text-blueink-soft transition-colors"
                >
                    DWG № RDK-2026 · REV C
                </Link>

                {/* Desktop sheet links */}
                <div className="hidden items-center gap-7 md:flex">
                    {sheets.map(renderSheet)}
                </div>

                {/* Mobile hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close sheet index" : "Open sheet index"}
                        aria-expanded={isOpen}
                        className="-mr-2 p-2 text-blueink transition-colors hover:text-ink"
                    >
                        {isOpen ? <FaTimes size={20} aria-hidden="true" /> : <FaBars size={20} aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Mobile sheet index */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-dashed border-blueink/35 bg-paper md:hidden"
                    >
                        <div className="flex flex-col px-6 py-2">
                            {sheets.map((sheet) => (
                                <div key={sheet.id} className="flex border-b border-blueink/15 py-3 last:border-0">
                                    {renderSheet(sheet)}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
