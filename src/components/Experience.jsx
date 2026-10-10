import { Bezel, Reveal } from "./ui";

const subsystems = [
    {
        tag: "IRIS · vision pipeline",
        title: "Video-analytics platform, DeepStream 6.2 → 9.0",
        stack: ["C++ / GStreamer", "DeepStream", "TensorRT", "CUDA"],
        span: "md:col-span-7",
        points: [
            "Core engineer on the rewrite; split the C++/GStreamer core from cloud and use-case code behind a stable plugin ABI — 3 shared libraries, 12 use-case modules that ship independently.",
            "~2.7× per-GPU camera capacity at 25% activity via per-camera activity gating; 99/99 active streams at 584 aggregate fps on one RTX PRO 6000.",
            "Root-caused a TensorRT 10.14 miscompile of DEIMv2 deformable attention; swapped GridSample for an MSDA plugin via ONNX graph surgery, back to 98.7% person-count parity.",
            "Alert delivery 15% → 98% (0.5 s p50 lag) with 16 workers on persistent libcurl connections; fixed GPU starvation (94.9 fps / 25 cameras) and added a global-stall watchdog.",
        ],
    },
    {
        tag: "VSS · vision-language layer",
        title: "VLM reasoning & edge video search",
        stack: ["vLLM", "Cosmos-Reason2", "Redis Streams / MQTT", "LanceDB"],
        span: "md:col-span-5",
        points: [
            "Architected VSS: a vLLM-served VLM (Cosmos-Reason2-2B) for scene descriptions and alert verification, fed by custom C++ GStreamer plugins with GPU-resident frames — 1.77 s p50 per 10 s window.",
            "4.7× VLM decode (41 → 193 tok/s) and 79% lower verdict latency (1.95 → 0.41 s) by enabling CUDA graphs after profiling showed 77% GPU idle time.",
            "Building edge video search on Cosmos-Embed1 + SigLIP2 crops, LanceDB/SQLite and FastAPI — 12 cameras at 5 fps on one RTX PRO 4000.",
        ],
    },
];

const Experience = () => (
    <div className="flex flex-col gap-4">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 px-2 pb-4">
            <div>
                <h3 className="font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-[-0.03em] text-ink">
                    Software Development Engineer, Avathon
                </h3>
                <p className="mt-1 text-[15px] text-label">Formerly SparkCognition · Bengaluru</p>
            </div>
            <span className="eyebrow eyebrow--accent">
                <span className="live-dot" aria-hidden="true"></span>
                Jul 2025 — present
            </span>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {subsystems.map((sub, i) => (
                <Reveal key={sub.tag} delay={i * 0.1} className={sub.span}>
                    <Bezel coreClassName="flex flex-col gap-6 p-8 md:p-10">
                        <div className="flex flex-col gap-3">
                            <span className="eyebrow">{sub.tag}</span>
                            <h4 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">{sub.title}</h4>
                        </div>
                        <ul className="flex flex-col gap-4">
                            {sub.points.map((point) => (
                                <li key={point} className="flex gap-3 text-[15px] leading-[1.65] text-body">
                                    <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-blueink" aria-hidden="true"></span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto flex flex-wrap gap-2 pt-2">
                            {sub.stack.map((chip) => (
                                <span key={chip} className="chip">{chip}</span>
                            ))}
                        </div>
                    </Bezel>
                </Reveal>
            ))}

            <Reveal className="md:col-span-12">
                <Bezel coreClassName="flex flex-wrap items-center justify-between gap-4 px-8 py-6 md:px-10">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-display text-[17px] font-semibold text-ink">SDE Intern, Hilti</span>
                        <span className="text-[14px] text-body">
                            GitLab CI/CD + Docker + WiX installer pipeline — deploys 2 h → 10 min
                        </span>
                    </div>
                    <span className="font-mono text-[12px] text-label">May – Jul 2024 · Pune</span>
                </Bezel>
            </Reveal>
        </div>
    </div>
);

export default Experience;
