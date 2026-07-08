const links = [
    { label: "GITHUB ↗", href: "https://github.com/rahuldeepak-the-one" },
    { label: "LINKEDIN ↗", href: "https://www.linkedin.com/in/rahul-deepak-kuchipudi-b4322825a" },
    { label: "EMAIL", href: "mailto:rahuldeepak.k.11@gmail.com" },
    { label: "RESUME ↗", href: "/resume.pdf" },
];

const Footer = () => (
    <footer className="border-t border-blueink/25">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-[11px] text-label md:px-12">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        className="text-blueink transition-colors hover:text-blueink-soft"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
            <span>© {new Date().getFullYear()} K. RAHUL DEEPAK · DWG № RDK-2026 · REV C</span>
        </div>
    </footer>
);

export default Footer;
