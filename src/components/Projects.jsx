import { Bezel, Reveal } from "./ui";

// asymmetric bento: wide/narrow, then narrow/wide
const projects = [
    {
        tag: "Kirn · open source",
        title: "AI terminal, fully local",
        description:
            "A Python terminal around bash and Ollama. Full-duplex PTYs keep vim and ssh working; a tool-calling loop feeds command output back to the model for follow-ups and error recovery. Runs on Linux and Android/Termux.",
        tech: ["Python", "Ollama", "Local LLMs"],
        href: "https://github.com/rahuldeepak-the-one/kirn",
        span: "md:col-span-7",
    },
    {
        tag: "Live translation · in use",
        title: "Speech → captions in 3 languages, one GPU",
        description:
            "faster-whisper → sentence assembly → IndicTrans2 batched EN→ML/TE/HI in one GPU call → WebSocket to projector and phones, in ~3–4 GB VRAM on an RTX 3060. 2,100+ sentences live at p50 0.5 s STT / 0.6 s MT.",
        tech: ["faster-whisper", "IndicTrans2", "FastAPI"],
        href: "https://github.com/rahuldeepak-the-one",
        span: "md:col-span-5",
    },
    {
        tag: "Skin-lesion · IIT Bombay",
        title: "Semi-supervised classification",
        description:
            "MixMatch pipeline for 7-class classification over 10k dermatoscopic images. Guide: Prof. Preethi Jyothi, IIT Bombay.",
        tech: ["PyTorch", "ResNet-50", "MixMatch"],
        href: "https://github.com/rahuldeepak-the-one",
        span: "md:col-span-5",
    },
    {
        tag: "Car speed",
        title: "Speed estimation from traffic video",
        description: "Vehicle detection and per-vehicle speed estimation on real traffic footage.",
        tech: ["YOLOv5", "OpenCV"],
        href: "https://github.com/rahuldeepak-the-one",
        span: "md:col-span-7",
    },
];

const Projects = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {projects.map((project, i) => (
            <Reveal key={project.tag} delay={(i % 2) * 0.1} className={project.span}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-[2rem]">
                    <Bezel lift className="h-full" coreClassName="flex flex-col gap-4 p-8 md:p-10">
                        <div className="flex items-start justify-between gap-4">
                            <span className="eyebrow">{project.tag}</span>
                            <span
                                aria-hidden="true"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/5 text-[13px] text-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:bg-blueink group-hover:text-white"
                            >
                                ↗
                            </span>
                        </div>
                        <h3 className="font-display text-[24px] font-semibold tracking-[-0.025em] text-ink">{project.title}</h3>
                        <p className="max-w-[60ch] text-[15px] leading-[1.65] text-body">{project.description}</p>
                        <div className="mt-auto flex flex-wrap gap-2 pt-2">
                            {project.tech.map((t) => (
                                <span key={t} className="chip">{t}</span>
                            ))}
                        </div>
                    </Bezel>
                </a>
            </Reveal>
        ))}
    </div>
);

export default Projects;
