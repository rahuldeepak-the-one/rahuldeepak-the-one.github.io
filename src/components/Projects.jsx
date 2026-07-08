const projects = [
    {
        fig: "FIG. B1 — KIRN ⚡",
        title: "AI terminal, fully local",
        description:
            "A real bash shell with a local LLM built in — `?` to ask, `@kirn` to act autonomously, auto error-explain. Linux + Android.",
        tech: "PYTHON · OLLAMA · LOCAL LLMS",
        href: "https://github.com/rahuldeepak-the-one/kirn",
    },
    {
        fig: "FIG. B2 — LIVE TRANSLATION",
        title: "Speech→caption, 3 languages, one GPU",
        description:
            "Streaming Whisper ASR → batched EN→ML/TE/HI neural translation → WebSocket broadcast, within ~3–4 GB VRAM on an RTX 3060.",
        tech: "FASTER-WHISPER · INDICTRANS2 · WEBSOCKET",
        href: "https://github.com/rahuldeepak-the-one",
    },
    {
        fig: "FIG. B3 — SKIN-LESION",
        title: "Semi-supervised classification",
        description:
            "MixMatch pipeline for 7-class classification over 10k dermatoscopic images. Guide: Prof. Preethi Jyothi, IIT Bombay.",
        tech: "PYTORCH · RESNET-50 · MIXMATCH",
        href: "https://github.com/rahuldeepak-the-one",
    },
    {
        fig: "FIG. B4 — CAR SPEED",
        title: "Speed estimation from traffic video",
        description: "Vehicle detection and per-vehicle speed estimation on real traffic footage.",
        tech: "YOLOV5 · OPENCV",
        href: "https://github.com/rahuldeepak-the-one",
    },
];

const Projects = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
            <a
                key={project.fig}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="fig-card fig-card--lift flex flex-col gap-2.5 p-7"
            >
                <span className="fig-tag">{project.fig}</span>
                <h3 className="font-display text-[19px] font-bold text-ink">{project.title}</h3>
                <p className="text-[14px] leading-[1.65] text-body">{project.description}</p>
                <span className="mt-1 font-mono text-[11px] text-label">{project.tech}</span>
            </a>
        ))}
    </div>
);

export default Projects;
