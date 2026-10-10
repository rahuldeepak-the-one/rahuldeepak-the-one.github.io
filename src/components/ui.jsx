import { motion } from "framer-motion";

const spring = [0.32, 0.72, 0, 1];

/** Quiet fade-up as the element enters the viewport. */
export const Reveal = ({ as = "div", delay = 0, className = "", children, ...rest }) => {
    const Tag = motion[as];
    return (
        <Tag
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, ease: spring, delay }}
            className={className}
            {...rest}
        >
            {children}
        </Tag>
    );
};

/** Flat surface with a hairline border; `frame` adds viewfinder brackets. */
export const Panel = ({ as: Tag = "div", frame = false, hover = false, className = "", children, ...rest }) => (
    <Tag className={`panel ${frame ? "frame" : ""} ${hover ? "frame-hover" : ""} ${className}`} {...rest}>
        {children}
    </Tag>
);

/** Kept for backwards compatibility with older pages. */
export const Bezel = ({ className = "", coreClassName = "", children }) => (
    <Panel className={`${className} ${coreClassName}`}>{children}</Panel>
);

const btnBase =
    "group inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[14px] font-medium transition-colors duration-300 active:translate-y-px";
const btnVariants = {
    solid: "bg-blueink text-on-accent hover:bg-blueink-soft",
    accent: "bg-blueink text-on-accent hover:bg-ink hover:text-paper",
    ghost: "text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] hover:shadow-[inset_0_0_0_1px_var(--color-blueink)] hover:text-blueink",
};

export const Button = ({ href, children, variant = "solid", icon, external = false, onClick, download }) => (
    <a
        href={href}
        onClick={onClick}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`${btnBase} ${btnVariants[variant]}`}
    >
        {children}
        {icon && (
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                {icon}
            </span>
        )}
    </a>
);

/** Back-compat alias. */
export const PillButton = (props) => <Button {...props} />;
