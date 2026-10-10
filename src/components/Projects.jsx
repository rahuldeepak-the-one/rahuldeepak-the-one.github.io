import { Panel, Reveal } from "./ui";

const featured = [
    {
        tag: "In use",
        title: "Live church translation",
        line: "Speech → captions in 3 languages, on one consumer GPU",
        description:
            "faster-whisper → sentence assembly → IndicTrans2, batching Malayalam, Telugu and Hindi in one GPU call → WebSockets to the projector and phones. Fits in ~3–4 GB VRAM on an RTX 3060; 2,100+ sentences served live at p50 0.5 s STT / 0.6 s MT.",
        tech: ["faster-whisper", "IndicTrans2", "FastAPI", "WebSockets"],
        meta: "Jul — Aug 2026",
    },
    {
        tag: "Open source",
        title: "Kirn",
        line: "An AI terminal that runs fully local",
        description:
            "A Python terminal around bash and Ollama. Full-duplex PTYs keep vim and ssh working; a tool-calling loop feeds command output back to the model for follow-ups and error recovery. Runs on Linux and Android/Termux.",
        tech: ["Python", "Ollama", "PTY", "Local LLMs"],
        href: "https://github.com/rahuldeepak-the-one/kirn",
        meta: "github.com/…/kirn",
    },
];

const earlier = [
    { title: "Semi-supervised skin-lesion classification", detail: "MixMatch over 10k dermatoscopic images, 7 classes · guided by Prof. Preethi Jyothi", tech: "PyTorch · ResNet-50", where: "IIT Bombay" },
    { title: "Vehicle speed from traffic video", detail: "Detection + per-vehicle speed estimation on real footage", tech: "YOLOv5 · OpenCV", where: "Personal" },
];

const FeaturedCard = ({ p }) => {
    const Tag = p.href ? "a" : "div";
    return (
        <Panel
            as={Tag}
            {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
            hover={!!p.href}
            frame
            className="group flex h-full flex-col gap-4 p-6 md:p-8"
        >
            <div className="flex items-center justify-between gap-4">
                <span className={p.href ? "tag tag--ghost" : "tag"}>{p.tag}</span>
                <span className="font-mono text-[12px] text-label transition-colors group-hover:text-blueink">
                    {p.meta} {p.href && "↗"}
                </span>
            </div>
            <div>
                <h3 className="font-display text-[24px] font-semibold tracking-[-0.025em] text-ink">{p.title}</h3>
                <p className="mt-1 text-[15px] text-ink/80">{p.line}</p>
            </div>
            <p className="text-[15px] leading-[1.65] text-body">{p.description}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {p.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                ))}
            </div>
        </Panel>
    );
};

const Projects = () => (
    <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {featured.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                    <FeaturedCard p={p} />
                </Reveal>
            ))}
        </div>

        <Reveal>
            <p className="eyebrow mb-3">Earlier work</p>
            <ul className="border-t border-line">
                {earlier.map((e) => (
                    <li key={e.title} className="grid grid-cols-1 gap-1 border-b border-line py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_230px] md:items-baseline md:gap-6">
                        <span className="text-[15px] font-medium text-ink">{e.title}</span>
                        <span className="text-[14px] text-body">{e.detail}</span>
                        <span className="font-mono text-[12px] text-label md:text-right">
                            {e.tech} · {e.where}
                        </span>
                    </li>
                ))}
            </ul>
        </Reveal>
    </div>
);

export default Projects;
