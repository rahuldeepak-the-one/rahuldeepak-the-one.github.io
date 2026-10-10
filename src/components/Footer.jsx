const links = [
    { label: "GitHub ↗", href: "https://github.com/rahuldeepak-the-one" },
    { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/rahul-deepak-kuchipudi-b4322825a" },
    { label: "Email", href: "mailto:rahuldeepak.k.11@gmail.com" },
    { label: "Resume ↗", href: "/resume.pdf" },
];

const Footer = () => (
    <footer className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 font-mono text-[12px] text-dim">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        className="text-mute transition-colors hover:text-white"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
            <span>© {new Date().getFullYear()} K. Rahul Deepak</span>
        </div>
    </footer>
);

export default Footer;
