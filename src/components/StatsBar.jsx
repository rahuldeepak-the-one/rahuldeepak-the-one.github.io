import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const stats = [
    { value: 99, decimals: 0, suffix: "", label: "LIVE STREAMS ON ONE GPU · 584 FPS", accent: true },
    { value: 2.7, decimals: 1, suffix: "×", label: "CAMERAS PER GPU · ACTIVITY GATING", accent: true },
    { value: 4.7, decimals: 1, suffix: "×", label: "VLM DECODE · 41→193 TOK/S", accent: true },
    { value: 98, decimals: 0, suffix: "%", label: "ALERT DELIVERY · UP FROM 15%", accent: false },
];

// dashed internal dividers for 4-col / 2×2 / 1-col layouts
const dividerClasses = [
    "border-b sm:border-r lg:border-b-0",
    "border-b lg:border-b-0 lg:border-r",
    "max-sm:border-b sm:border-r",
    "",
];

const AnimatedCounter = ({ target, decimals, duration = 1600 }) => {
    const prefersReducedMotion = useReducedMotion();
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView || prefersReducedMotion) return undefined;
        const steps = Math.ceil(duration / 16);
        let step = 0;
        const timer = setInterval(() => {
            step += 1;
            const t = Math.min(1, step / steps);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(target * eased);
            if (t >= 1) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target, duration, prefersReducedMotion]);

    const shown = prefersReducedMotion || !isInView ? target : count;
    return <span ref={ref}>{shown.toFixed(decimals)}</span>;
};

const StatsBar = () => (
    <div className="border-y border-blueink/35 bg-white/55">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <div key={stat.label} data-det="metric" className={`border-dashed border-blueink/30 px-8 py-[26px] ${dividerClasses[i]}`}>
                    <div
                        className={`font-display text-[34px] font-extrabold tabular-nums ${
                            stat.accent ? "text-blueink" : "text-ink"
                        }`}
                    >
                        <AnimatedCounter target={stat.value} decimals={stat.decimals} />
                        {stat.suffix}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-label">{stat.label}</div>
                </div>
            ))}
        </div>
    </div>
);

export default StatsBar;
