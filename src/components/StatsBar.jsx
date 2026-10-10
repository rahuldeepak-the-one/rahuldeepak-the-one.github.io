import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const stats = [
    { value: 99, decimals: 0, suffix: "", label: "live camera streams on one GPU", why: "Fewer GPUs per site means the product costs less to run." },
    { value: 2.7, decimals: 1, suffix: "×", label: "more cameras per GPU", why: "Cameras that see nothing happening stop costing compute." },
    { value: 4.7, decimals: 1, suffix: "×", label: "faster VLM decoding", why: "Descriptions arrive while the event is still happening." },
    { value: 98, decimals: 0, suffix: "%", label: "alerts delivered, up from 15%", why: "An alert that never arrives is worse than no camera." },
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
    <div className="mx-auto mt-20 max-w-[1200px] px-6 md:px-14">
        <div className="grid grid-cols-1 border-y border-line-2 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5 py-7 pr-6">
                    <div className="font-display text-[36px] font-extrabold tracking-[-1px] text-white tabular-nums">
                        <AnimatedCounter target={stat.value} decimals={stat.decimals} />
                        {stat.suffix}
                    </div>
                    <div className="text-[14px] font-semibold leading-[1.4] text-star">{stat.label}</div>
                    <div className="text-[14px] leading-[1.55] text-mute">{stat.why}</div>
                </div>
            ))}
        </div>
    </div>
);

export default StatsBar;
