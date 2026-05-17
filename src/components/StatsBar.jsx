import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { label: "FPS Optimized", value: 142, suffix: "+", icon: "⚡" },
    { label: "Inference Speedup", value: 40, suffix: "%", icon: "🚀" },
    { label: "Camera Streams", value: 8, suffix: "+", icon: "📷" },
    { label: "Edge Sites", value: 10, suffix: "+", icon: "🛰️" },
];

const AnimatedCounter = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
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
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}</span>;
};

const StatsBar = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="text-center group"
                >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-bold text-[var(--color-orange)] mb-1">
                        <AnimatedCounter target={stat.value} />
                        {stat.suffix}
                    </div>
                    <div className="text-slate-400 text-sm font-mono">{stat.label}</div>
                </motion.div>
            ))}
        </div>
    );
};

export default StatsBar;
