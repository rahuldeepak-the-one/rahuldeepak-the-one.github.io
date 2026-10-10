import { motion } from "framer-motion";
import ElectronField from "./ElectronField";
import { PillButton } from "./ui";

const spring = [0.32, 0.72, 0, 1];
const rise = (delay) => ({
    initial: { opacity: 0, y: 40, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, ease: spring, delay },
});

const Hero = () => {
    const openWork = (e) => {
        e.preventDefault();
        const element = document.getElementById("experience");
        if (!element) return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    };

    return (
        <section id="hero" className="relative min-h-[min(100dvh,960px)] overflow-hidden">
            <ElectronField color="#2f4fe0" linkColor="rgba(47,79,224,0.08)" />
            <div className="pointer-events-none relative mx-auto flex min-h-[min(100dvh,960px)] max-w-[1280px] flex-col justify-center gap-8 px-4 pb-24 pt-36 md:px-12">
                <motion.span {...rise(0.05)} className="eyebrow eyebrow--accent">
                    <span className="live-dot" aria-hidden="true"></span>
                    SDE @ Avathon · IIT Bombay CSE
                </motion.span>

                <motion.h1
                    {...rise(0.15)}
                    className="max-w-[14ch] font-display text-[clamp(48px,9vw,120px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
                >
                    Rahul Deepak Kuchipudi
                </motion.h1>

                <motion.p {...rise(0.3)} className="max-w-[52ch] text-[clamp(17px,1.6vw,20px)] font-light leading-[1.6] text-body text-pretty">
                    I build GPU video-analytics pipelines and the vision-language models that reason over
                    them — <span className="text-ink">99 live camera streams on a single GPU</span>, from
                    TensorRT kernels to verified alerts.
                </motion.p>

                <motion.div {...rise(0.45)} className="pointer-events-auto flex flex-wrap gap-3">
                    <PillButton href="#experience" onClick={openWork} icon="↓">
                        See the work
                    </PillButton>
                    <PillButton href="/resume.pdf" variant="ghost" external>
                        Resume
                    </PillButton>
                    <PillButton href="https://github.com/rahuldeepak-the-one" variant="ghost" external>
                        GitHub
                    </PillButton>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
