import DetectionField from "./DetectionField";

const stages = ["DECODE", "DETECT", "TRACK", "VLM VERIFY", "ALERT"];

const Hero = () => {
    const openWork = (e) => {
        e.preventDefault();
        const element = document.getElementById("experience");
        if (!element) return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    };

    return (
        <section id="hero" className="relative min-h-[540px]">
            <DetectionField />

            {/* Text layer is pointer-transparent so the field tracks the cursor */}
            <div className="pointer-events-none relative mx-auto flex min-h-[540px] max-w-[1200px] flex-col justify-center gap-5 px-6 py-16 md:px-16">
                <p className="flex items-center gap-2 font-mono text-[12px] tracking-[1px] text-blueink">
                    <span className="live-dot" aria-hidden="true"></span>
                    SDE @ AVATHON · IIT BOMBAY CSE
                </p>

                <h1 className="font-display text-[clamp(40px,8vw,72px)] font-extrabold leading-[1.02] tracking-[-2px] text-ink">
                    Rahul Deepak
                    <br />
                    Kuchipudi
                </h1>

                <p className="max-w-[600px] text-[18px] leading-[1.6] text-body text-pretty">
                    I build GPU video-analytics pipelines and the vision-language models that reason
                    over them — from TensorRT kernels to alerts on a dashboard.
                </p>

                <ol className="flex flex-wrap items-center gap-y-2 font-mono text-[11px] text-label" aria-label="Pipeline I work on">
                    {stages.map((stage, i) => (
                        <li key={stage} className="flex items-center">
                            {i > 0 && <span className="px-2 text-blueink/50" aria-hidden="true">→</span>}
                            <span className="border border-blueink/35 bg-white/70 px-2 py-1">{stage}</span>
                        </li>
                    ))}
                </ol>

                <div className="pointer-events-auto mt-2 flex flex-wrap gap-[14px]">
                    <a
                        href="#experience"
                        onClick={openWork}
                        className="btn-solid"
                    >
                        See the work →
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                        Resume ↗
                    </a>
                    <a
                        href="https://github.com/rahuldeepak-the-one"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                    >
                        GitHub ↗
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
