import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Bezel, Reveal } from "./ui";

// bento spans: two wide hero numbers, two narrower supporting ones
const stats = [
    { value: 99, decimals: 0, suffix: "", label: "Live streams on one GPU", sub: "584 aggregate fps · RTX PRO 6000", span: "md:col-span-7" },
    { value: 4.7, decimals: 1, suffix: "×", label: "VLM decode throughput", sub: "41 → 193 tok/s with CUDA graphs", span: "md:col-span-5" },
    { value: 2.7, decimals: 1, suffix: "×", label: "Cameras per GPU", sub: "per-camera activity gating", span: "md:col-span-5" },
    { value: 98, decimals: 0, suffix: "%", label: "Alert delivery", sub: "up from 15% · 0.5 s p50 lag", span: "md:col-span-7" },
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className={stat.span}>
                <Bezel className="h-full" coreClassName="flex flex-col justify-between gap-10 p-8 md:p-10">
                    <span className="eyebrow">{stat.label}</span>
                    <div>
                        <div className="font-display text-[clamp(56px,7vw,88px)] font-semibold leading-none tracking-[-0.05em] text-ink tabular-nums">
                            <AnimatedCounter target={stat.value} decimals={stat.decimals} />
                            <span className="text-blueink">{stat.suffix}</span>
                        </div>
                        <p className="mt-3 font-mono text-[12px] text-label">{stat.sub}</p>
                    </div>
                </Bezel>
            </Reveal>
        ))}
    </div>
);

export default StatsBar;
