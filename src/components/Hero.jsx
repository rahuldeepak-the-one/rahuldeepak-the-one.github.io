import ElectronField from "./ElectronField";
import DimensionLine from "./DimensionLine";

const Hero = () => {
    const openProjects = (e) => {
        e.preventDefault();
        const element = document.getElementById("projects");
        if (!element) return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    };

    return (
        <section id="hero" className="relative min-h-[500px]">
            <ElectronField />

            {/* Text layer is pointer-transparent so the field reacts to the cursor */}
            <div className="pointer-events-none relative mx-auto flex min-h-[500px] max-w-[1200px] flex-col justify-center gap-[18px] px-6 py-16 md:px-16">
                <p className="font-mono text-[12px] tracking-[2px] text-blueink">
                    TITLE BLOCK — ENGINEER, GPU VIDEO ANALYTICS &amp; VLM SYSTEMS · IIT BOMBAY CSE
                </p>

                <h1 data-det="name" className="font-display text-[clamp(40px,8vw,72px)] font-extrabold leading-[1.02] tracking-[-2px] text-ink">
                    RAHUL DEEPAK
                    <br />
                    KUCHIPUDI
                </h1>

                <DimensionLine className="max-w-[640px]" />

                <p className="max-w-[640px] font-mono text-[14px] leading-[1.8] text-body">
                    SPEC: builds both halves of the stack — the DeepStream/TensorRT/CUDA video pipeline and
                    the vLLM-served VLM layer reasoning over it. RATED: 99 live streams on one GPU.
                </p>

                <div className="pointer-events-auto mt-2 flex flex-wrap gap-[14px]">
                    <a
                        href="#projects"
                        onClick={openProjects}
                        className="bg-blueink px-[30px] py-[13px] font-mono text-[13px] font-bold text-white transition-colors hover:bg-blueink-soft"
                    >
                        OPEN SHEET 2 →
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-dashed border-blueink/55 bg-white/60 px-[30px] py-[13px] font-mono text-[13px] text-blueink transition-colors hover:border-solid hover:border-blueink"
                    >
                        RESUME ↗
                    </a>
                    <a
                        href="https://github.com/rahuldeepak-the-one"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-dashed border-blueink/55 bg-white/60 px-[30px] py-[13px] font-mono text-[13px] text-blueink transition-colors hover:border-solid hover:border-blueink"
                    >
                        GITHUB ↗
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
