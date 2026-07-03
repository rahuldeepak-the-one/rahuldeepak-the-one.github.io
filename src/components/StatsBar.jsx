import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FaBolt, FaTachometerAlt, FaVideo, FaSatelliteDish } from "react-icons/fa";

const stats = [
    { label: "peak FPS · RTX 3060", value: 142, suffix: "+", icon: FaBolt },
    { label: "inference speedup", value: 40, suffix: "%", icon: FaTachometerAlt },
    { label: "camera streams", value: 8, suffix: "+", icon: FaVideo },
    { label: "edge sites live", value: 10, suffix: "+", icon: FaSatelliteDish },
];

const AnimatedCounter = ({ target, duration = 2000 }) => {
    const prefersReducedMotion = useReducedMotion();
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView || prefersReducedMotion) return;
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target, duration, prefersReducedMotion]);

    return <span ref={ref}>{prefersReducedMotion ? target : count}</span>;
};

const StatsBar = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 border border-[var(--color-edge)] rounded-lg bg-[var(--color-panel)]/40 overflow-hidden"
        >
            {/* Panel header, nvidia-smi style */}
            <div className="flex flex-wrap justify-between items-center gap-2 px-5 py-3 border-b border-[var(--color-edge)] text-xs font-mono">
                <span className="text-[var(--color-orange)] font-bold">$ rahul-smi</span>
                <span className="text-[var(--color-dim)]/70">edge deployment metrics · production</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 px-5 py-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <stat.icon className="mx-auto mb-3 text-[var(--color-orange)]" size={20} aria-hidden="true" />
                        <div className="text-3xl md:text-4xl font-bold text-[var(--color-signal)] mb-1 tabular-nums">
                            <AnimatedCounter target={stat.value} />
                            {stat.suffix}
                        </div>
                        <div className="text-[var(--color-dim)] text-xs sm:text-sm font-mono">{stat.label}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default StatsBar;
