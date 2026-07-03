import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const logLines = [
    "deepstream-9.0 — pipeline up · 8 streams @ 142 FPS on RTX 3060",
    "tensorrt fp16/int8 — inference latency down 40%, zero-copy buffers",
    "vss — vLLM scene summaries streaming over kafka",
    "fleet — 10+ edge sites reporting healthy",
    "status — open to conversations about edge AI & systems",
];

const SystemLog = () => {
    const prefersReducedMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Auto-rotating content stays paused for reduced-motion users
        if (prefersReducedMotion) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % logLines.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [prefersReducedMotion]);

    return (
        <div className="border-t border-b border-[var(--color-edge)] py-4 my-16 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 font-mono text-xs sm:text-sm text-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="text-[var(--color-dim)]"
                    >
                        <span className="text-[var(--color-signal)]">[&nbsp;&nbsp;OK&nbsp;&nbsp;]</span>{" "}
                        {logLines[index]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SystemLog;
