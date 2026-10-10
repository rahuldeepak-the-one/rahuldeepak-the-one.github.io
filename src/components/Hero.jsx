import { useState } from "react";
import NeuralSky from "./NeuralSky";
import { skyThoughts } from "../data/skyThoughts";

const narrow = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

// on phones the network spreads behind the text, so it is drawn fainter
const skyConfig = narrow ? { gap: 2600, x0: 0.08, nodeAlpha: 0.65 } : { gap: 2600 };

const linkClass = "text-soft transition-colors hover:text-white";

const Hero = () => {
    const [thought, setThought] = useState("DeepStream 9");

    const seeWork = (e) => {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("experience")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    };

    return (
        <section id="hero" className="relative h-[88vh] max-h-[760px] min-h-[600px] overflow-hidden">
            <div className="absolute inset-0">
                <NeuralSky {...skyConfig} onThought={setThought} />
            </div>

            {/* Text layer is pointer-transparent (links excepted) so the sky reacts to the cursor */}
            <div className="pointer-events-none absolute inset-0 mx-auto max-w-[1200px]">
                <div className="absolute bottom-16 left-6 right-6 flex flex-col gap-[18px] md:left-14 md:right-auto md:max-w-[540px]">
                    <h1 className="font-display text-[clamp(40px,7vw,62px)] font-extrabold leading-[1.02] tracking-[-2px] text-white">
                        Rahul Deepak
                        <br />
                        Kuchipudi
                    </h1>
                    <p className="text-[18px] leading-[1.65] text-soft">
                        I build software that lets cameras <b className="font-bold text-white">see</b> and AI models{" "}
                        <b className="font-bold text-white">explain</b> what they saw — fast, on a single GPU.
                    </p>
                    <div aria-live="polite" className="flex min-h-12 flex-col gap-1 border-l-2 border-accent pl-[14px]">
                        <span className="font-mono text-[11px] tracking-[1px] text-accent">THE SKY IS THINKING ABOUT → {thought}</span>
                        <span className="text-[15px] leading-[1.5] text-star">{skyThoughts[thought]}</span>
                    </div>
                    <div className="pointer-events-auto flex flex-wrap gap-6 text-[15px] font-semibold">
                        <a href="#experience" onClick={seeWork} className="border-b border-accent pb-0.5 text-white">
                            See the work ↓
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
                            Resume ↗
                        </a>
                        <a href="https://github.com/rahuldeepak-the-one" target="_blank" rel="noopener noreferrer" className={linkClass}>
                            GitHub ↗
                        </a>
                    </div>
                </div>
                <span className="absolute bottom-16 right-14 hidden font-mono text-[11px] text-dim md:block pointer-coarse:hidden">
                    each star is a neuron · hover the sky
                </span>
            </div>
        </section>
    );
};

export default Hero;
