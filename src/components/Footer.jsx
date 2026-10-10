const links = [
    { label: "GitHub", href: "https://github.com/rahuldeepak-the-one" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-deepak-kuchipudi-b4322825a" },
    { label: "Email", href: "mailto:rahuldeepak.k.11@gmail.com" },
    { label: "Resume", href: "/resume.pdf" },
];

const Footer = () => (
    <footer className="mx-auto max-w-[1200px] px-5 pb-10 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8 text-[13px]">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        className="text-body transition-colors hover:text-blueink"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
            <span className="font-mono text-[12px] text-label">© {new Date().getFullYear()} Rahul Deepak Kuchipudi · Bengaluru</span>
        </div>
    </footer>
);

export default Footer;
