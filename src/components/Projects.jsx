const projects = [
    {
        tag: "kirn · open source",
        title: "AI terminal, fully local",
        description:
            "A Python terminal around bash and Ollama. Full-duplex PTYs keep vim and ssh working; a tool-calling loop feeds command output back to the model for follow-ups and error recovery. Runs on Linux and Android/Termux.",
        tech: "PYTHON · OLLAMA · LOCAL LLMS",
        href: "https://github.com/rahuldeepak-the-one/kirn",
    },
    {
        tag: "live translation · in use",
        title: "Speech → captions in 3 languages, one GPU",
        description:
            "Offline faster-whisper → sentence assembly → IndicTrans2 batched EN→ML/TE/HI in one GPU call → WebSocket to projector and phones, within ~3–4 GB VRAM on an RTX 3060. 2,100+ sentences served live at p50 0.5 s STT / 0.6 s MT.",
        tech: "FASTER-WHISPER · INDICTRANS2 · FASTAPI / WEBSOCKET",
        href: "https://github.com/rahuldeepak-the-one",
    },
    {
        tag: "skin-lesion · iit bombay",
        title: "Semi-supervised classification",
        description:
            "MixMatch pipeline for 7-class classification over 10k dermatoscopic images. Guide: Prof. Preethi Jyothi, IIT Bombay.",
        tech: "PYTORCH · RESNET-50 · MIXMATCH",
        href: "https://github.com/rahuldeepak-the-one",
    },
    {
        tag: "car speed",
        title: "Speed estimation from traffic video",
        description: "Vehicle detection and per-vehicle speed estimation on real traffic footage.",
        tech: "YOLOV5 · OPENCV",
        href: "https://github.com/rahuldeepak-the-one",
    },
];

const Projects = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => (
            <a
                key={project.tag}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="det-card det-card--lift flex flex-col gap-2.5 p-7"
            >
                <span className="det-tag">{project.tag}</span>
                <h3 className="font-display text-[19px] font-bold text-ink">{project.title}</h3>
                <p className="text-[14px] leading-[1.65] text-body">{project.description}</p>
                <span className="mt-auto pt-1 font-mono text-[11px] text-label">{project.tech}</span>
            </a>
        ))}
    </div>
);

export default Projects;
