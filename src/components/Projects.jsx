import NeuralSky from "./NeuralSky";

const cardSky = { bgN: 60, x0: 0.12, x1: 0.88, gap: 500, hoverOnly: true };

const projects = [
    {
        title: "Kirn ⚡",
        what: "A terminal with a local AI built in.",
        tech: "Python · Ollama · local LLMs",
        href: "https://github.com/rahuldeepak-the-one/kirn",
        sky: { counts: [3, 4, 4, 2], seed: 21, words: ["bash", "Ollama", "tool calls", "PTY", "Termux"] },
    },
    {
        title: "Live translation",
        what: "Speech becomes captions in three languages, live.",
        tech: "faster-whisper · IndicTrans2",
        href: "https://github.com/rahuldeepak-the-one",
        sky: { counts: [2, 4, 4, 3], seed: 33, words: ["whisper", "EN → ML", "EN → TE", "EN → HI", "0.5 s p50"] },
    },
    {
        title: "Skin-lesion classifier",
        what: "Sorts skin images into 7 conditions.",
        tech: "PyTorch · MixMatch",
        href: "https://github.com/rahuldeepak-the-one",
        sky: { counts: [4, 5, 3, 2], seed: 47, words: ["MixMatch", "ResNet-50", "7 classes", "10k images"] },
    },
    {
        title: "Car speed",
        what: "Estimates each vehicle's speed from traffic video.",
        tech: "YOLOv5 · OpenCV",
        href: "https://github.com/rahuldeepak-the-one",
        sky: { counts: [3, 3, 4, 2], seed: 59, words: ["YOLOv5", "tracking", "km/h", "OpenCV"] },
    },
];

const Projects = () => (
    <>
        <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] tracking-[1px] text-accent">PROJECTS · HOVER A SKY TO WAKE IT</span>
            <h2 className="font-display text-[32px] font-bold leading-[1.2] tracking-[-1px] text-white">Things I built on my own time</h2>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((p) => (
                <a
                    key={p.title}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-[150px_minmax(0,1fr)] overflow-hidden rounded-md border border-line-2 bg-night-2 transition-colors duration-200 hover:border-accent/50"
                >
                    <div className="h-[150px] border-r border-line bg-night-3">
                        <NeuralSky {...cardSky} {...p.sky} />
                    </div>
                    <div className="flex flex-col justify-center gap-2 px-6 py-[22px]">
                        <h3 className="font-display text-[18px] font-semibold text-white">{p.title}</h3>
                        <p className="text-[15px] leading-[1.55] text-soft">{p.what}</p>
                        <span className="font-mono text-[11px] text-dim">{p.tech}</span>
                    </div>
                </a>
            ))}
        </div>
    </>
);

export default Projects;
