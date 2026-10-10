import { motion } from "framer-motion";

const spring = [0.32, 0.72, 0, 1];

/** Heavy fade-up with a blur resolve as the element enters the viewport. */
export const Reveal = ({ as = "div", delay = 0, className = "", children, ...rest }) => {
    const Tag = motion[as];
    return (
        <Tag
            initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: spring, delay }}
            className={className}
            {...rest}
        >
            {children}
        </Tag>
    );
};

/** Double bezel — outer tray + inner core with concentric radii. */
export const Bezel = ({ lift = false, className = "", coreClassName = "", children }) => (
    <div className={`bezel ${lift ? "bezel--lift" : ""} ${className}`}>
        <div className={`bezel-core ${coreClassName}`}>{children}</div>
    </div>
);

/** Pill button with its trailing arrow nested in its own circle. */
export const PillButton = ({ href, children, variant = "solid", icon = "↗", external = false, onClick }) => {
    const solid = variant === "solid";
    return (
        <a
            href={href}
            onClick={onClick}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[14px] font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                solid
                    ? "bg-ink text-white shadow-[0_12px_32px_-12px_rgba(17,18,20,0.5)] hover:bg-blueink"
                    : "bg-white text-ink shadow-[0_0_0_1px_rgba(17,18,20,0.08)] hover:shadow-[0_0_0_1px_rgba(47,79,224,0.35)]"
            }`}
        >
            {children}
            <span
                aria-hidden="true"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:scale-105 ${
                    solid ? "bg-white/15" : "bg-ink/5"
                }`}
            >
                {icon}
            </span>
        </a>
    );
};
