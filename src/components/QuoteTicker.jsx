import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
    { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "The only way to go fast is to go well.", author: "Robert C. Martin" },
];

const QuoteTicker = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="border-t border-b border-slate-800 py-6 my-16 overflow-hidden">
            <div className="max-w-3xl mx-auto text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-lg md:text-xl text-slate-300 italic mb-2">
                            "{quotes[index].text}"
                        </p>
                        <p className="text-sm text-[var(--color-orange)] font-mono">
                            — {quotes[index].author}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default QuoteTicker;
