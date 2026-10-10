const links = [
    { label: "GitHub", href: "https://github.com/rahuldeepak-the-one" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-deepak-kuchipudi-b4322825a" },
    { label: "Email", href: "mailto:rahuldeepak.k.11@gmail.com" },
    { label: "Resume", href: "/resume.pdf" },
];

const Footer = () => (
    <footer className="mx-auto max-w-[1280px] px-4 pb-12 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8 text-[13px] text-label">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        className="text-ink transition-colors duration-500 hover:text-blueink"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
            <span className="font-mono text-[12px]">© {new Date().getFullYear()} Rahul Deepak Kuchipudi · Bengaluru</span>
        </div>
    </footer>
);

export default Footer;
