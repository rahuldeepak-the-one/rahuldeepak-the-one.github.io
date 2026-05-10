import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/" || location.pathname === "";

    const navLinks = isHome
        ? [
              { name: "> home", href: "#hero", type: "anchor" },
              { name: "> experience", href: "#experience", type: "anchor" },
              { name: "> projects", href: "#projects", type: "anchor" },
              { name: "> skills", href: "#skills", type: "anchor" },
              { name: "> blog", href: "/blog", type: "route" },
              { name: "> contact", href: "#contact", type: "anchor" },
          ]
        : [
              { name: "> home", href: "/", type: "route" },
              { name: "> blog", href: "/blog", type: "route" },
          ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
            setIsOpen(false);
        }
    };

    const renderLink = (link) => {
        if (link.type === "route") {
            return (
                <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-slate-300 hover:text-[var(--color-orange)] transition-colors text-sm font-medium ${
                        location.pathname === link.href ? "text-[var(--color-orange)]" : ""
                    }`}
                >
                    {link.name}
                </Link>
            );
        }
        return (
            <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-slate-300 hover:text-[var(--color-orange)] transition-colors text-sm font-medium"
            >
                {link.name}
            </a>
        );
    };

    const renderMobileLink = (link) => {
        if (link.type === "route") {
            return (
                <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-slate-300 hover:text-[var(--color-orange)] py-2 text-base font-medium border-b border-slate-800/50 last:border-0 ${
                        location.pathname === link.href ? "text-[var(--color-orange)]" : ""
                    }`}
                >
                    {link.name}
                </Link>
            );
        }
        return (
            <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block text-slate-300 hover:text-[var(--color-orange)] py-2 text-base font-medium border-b border-slate-800/50 last:border-0"
            >
                {link.name}
            </a>
        );
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800"
                    : "bg-slate-900/50 backdrop-blur-sm"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold tracking-tight text-white hover:text-[var(--color-orange)] transition-colors cursor-pointer"
                >
                    <span className="text-[var(--color-orange)]">$</span> rahul_deepak
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map(renderLink)}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none hover:text-[var(--color-orange)] transition-colors"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden bg-slate-900 border-b border-slate-800"
                    >
                        <div className="px-6 py-4 flex flex-col space-y-4">
                            {navLinks.map(renderMobileLink)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
