import { motion } from "framer-motion";
import Viewfinder from "./Viewfinder";
import { Button } from "./ui";

const spring = [0.32, 0.72, 0, 1];
const rise = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: spring, delay },
});

const Hero = () => (
    <section id="hero" className="relative overflow-hidden">
        {/* faint measurement grid */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_70%)] opacity-60"
        ></div>

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-28 md:px-10 md:pt-36 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
            <div className="flex flex-col gap-7">
                <motion.span {...rise(0.05)} className="eyebrow">
                    <span className="live-dot" aria-hidden="true"></span>
                    SDE @ Avathon · IIT Bombay CSE
                </motion.span>

                <motion.h1
                    {...rise(0.12)}
                    className="font-display text-[clamp(44px,6.6vw,84px)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink"
                >
                    Rahul Deepak
                    <br />
                    Kuchipudi
                </motion.h1>

                <motion.p {...rise(0.2)} className="max-w-[46ch] text-[clamp(17px,1.5vw,19px)] leading-[1.6] text-body text-pretty">
                    I build GPU video-analytics pipelines and the vision-language models that reason over them —
                    from <span className="text-ink">TensorRT detectors</span> on live camera streams to{" "}
                    <span className="text-ink">vLLM-served verdicts</span> on what they saw.
                </motion.p>

                <motion.div {...rise(0.28)} className="flex flex-wrap gap-3">
                    <Button href="/resume.pdf" external icon="↗">
                        Resume
                    </Button>
                    <Button href="https://github.com/rahuldeepak-the-one" variant="ghost" external icon="↗">
                        GitHub
                    </Button>
                    <Button href="mailto:rahuldeepak.k.11@gmail.com" variant="ghost">
                        rahuldeepak.k.11@gmail.com
                    </Button>
                </motion.div>
            </div>

            <motion.div {...rise(0.25)}>
                <Viewfinder />
            </motion.div>
        </div>
    </section>
);

export default Hero;
