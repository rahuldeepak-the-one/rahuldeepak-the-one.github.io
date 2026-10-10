const subsystems = [
    {
        tag: "IRIS · vision pipeline",
        title: "Video-analytics platform, DeepStream 6.2 → 9.0",
        stack: ["C++ / GSTREAMER", "DEEPSTREAM", "TENSORRT", "CUDA"],
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
        stack: ["VLLM", "COSMOS-REASON2", "REDIS STREAMS / MQTT", "LANCEDB"],
        points: [
            "Architected VSS: a vLLM-served VLM (Cosmos-Reason2-2B) for scene descriptions and alert verification, fed by custom C++ GStreamer plugins with GPU-resident frames — 1.77 s p50 per 10 s window.",
            "4.7× VLM decode (41 → 193 tok/s) and 79% lower verdict latency (1.95 → 0.41 s) by enabling CUDA graphs after profiling showed 77% GPU idle time.",
            "Building edge video search on Cosmos-Embed1 + SigLIP2 crops, LanceDB/SQLite and FastAPI — 12 cameras at 5 fps on one RTX PRO 4000.",
        ],
    },
];

const Experience = () => (
    <div className="flex flex-col gap-8">
        <article className="det-card p-8">
            <span className="det-tag">role · current</span>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-[22px] font-bold text-ink">
                    Software Development Engineer — Avathon
                </h3>
                <span className="font-mono text-[11px] text-blueink">JUL 2025 – PRESENT · BENGALURU</span>
            </div>
            <p className="mt-1 text-[14px] text-label">Formerly SparkCognition</p>

            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {subsystems.map((sub) => (
                    <section key={sub.tag} className="border-l-2 border-blueink/40 pl-5">
                        <p className="font-mono text-[11px] font-bold text-blueink">{sub.tag.toUpperCase()}</p>
                        <h4 className="mt-1 font-display text-[16px] font-semibold text-ink">{sub.title}</h4>
                        <ul className="mt-3 flex flex-col gap-2.5">
                            {sub.points.map((point) => (
                                <li key={point} className="flex gap-2.5 text-[14px] leading-[1.65] text-body">
                                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-blueink/60" aria-hidden="true"></span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {sub.stack.map((chip) => (
                                <span key={chip} className="chip">{chip}</span>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </article>

        <article className="det-card flex flex-wrap items-baseline justify-between gap-4 px-8 py-[22px]">
            <span className="det-tag det-tag--muted">internship</span>
            <h3 className="font-display text-[16px] font-bold text-ink">
                SDE Intern — Hilti{" "}
                <span className="font-body text-[13px] font-medium text-label">
                    · GitLab CI/CD + Docker + WiX installer pipeline, deploys 2 h → 10 min
                </span>
            </h3>
            <span className="font-mono text-[11px] text-label">MAY – JUL 2024 · PUNE</span>
        </article>
    </div>
);

export default Experience;
