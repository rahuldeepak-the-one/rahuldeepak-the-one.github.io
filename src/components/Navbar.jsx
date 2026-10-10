import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sections = [
    { id: "experience", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "notes", label: "Notes" },
    { id: "contact", label: "Contact", accent: true },
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
    const [pastHero, setPastHero] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/" || location.pathname === "";
    const solid = !isHome || pastHero || isOpen;

    // scroll-spy: highlight the link whose section is on screen
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
        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [isHome]);

    // transparent over the hero sky, solid once scrolled past it
    useEffect(() => {
        if (!isHome) return undefined;
        const onScroll = () => {
            const hero = document.getElementById("hero");
            setPastHero(window.scrollY > (hero ? hero.offsetHeight - 80 : 400));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    const handleClick = (e, id) => {
        e.preventDefault();
        setIsOpen(false);
        if (isHome) scrollToSection(id);
        else navigate("/", { state: { scrollTo: id } });
    };

    const linkClass = (s) =>
        `text-[14px] font-medium transition-colors hover:text-white ${
            s.accent || (isHome && activeSection === s.id) ? "text-white" : "text-mute"
        }`;

    const renderLink = (s) => (
        <a key={s.id} href={`#${s.id}`} onClick={(e) => handleClick(e, s.id)} className={linkClass(s)}>
            {s.label}
        </a>
    );

    return (
        <nav
            className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-50 transition-colors duration-300 ${
                solid ? "border-b border-line bg-night/85 backdrop-blur" : "border-b border-transparent"
            }`}
        >
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6 md:px-14">
                <Link
                    to="/"
                    onClick={(e) => {
                        if (isHome) {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                        setIsOpen(false);
                    }}
                    className="font-display text-[15px] font-semibold text-star"
                >
                    Rahul Deepak
                </Link>

                <div className="hidden items-center gap-[30px] md:flex">{sections.map(renderLink)}</div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    className="-mr-2 p-2 text-mute transition-colors hover:text-white md:hidden"
                >
                    {isOpen ? <FaTimes size={20} aria-hidden="true" /> : <FaBars size={20} aria-hidden="true" />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-line md:hidden"
                    >
                        <div className="flex flex-col px-6 py-2">
                            {sections.map((s) => (
                                <div key={s.id} className="flex border-b border-line py-3 last:border-0">
                                    {renderLink(s)}
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
