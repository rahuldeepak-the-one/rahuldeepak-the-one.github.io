import { Panel, Reveal } from "./ui";
import ArchDiagram from "./ArchDiagram";

const subsystems = [
    {
        tag: "IRIS",
        title: "Video-analytics platform — DeepStream 6.2 → 9.0 rewrite",
        stack: ["C++", "GStreamer", "DeepStream", "TensorRT", "CUDA"],
        points: [
            "Core engineer on the rewrite: split the C++/GStreamer core from cloud and use-case code behind a stable plugin ABI, so 12 use-case modules ship independently of the runtime.",
            "Raised per-GPU camera capacity ~2.7× at 25% activity through per-camera activity gating; in a separate scale run, sustained 99/99 active streams at 584 fps on one RTX PRO 6000.",
            "Root-caused a TensorRT 10.14 miscompile of DEIMv2 deformable attention by diffing ONNX vs. engine outputs; replaced GridSample with an MSDA plugin via ONNX graph surgery (98.7% parity).",
            "Traced growing alert queues to a one-request-per-round-trip sender; added 16 workers on persistent libcurl connections (15% → 98% delivered). Fixed batch-timeout GPU starvation and added a global-stall watchdog.",
        ],
    },
    {
        tag: "VSS",
        title: "Vision-language layer & edge video search",
        stack: ["vLLM", "Cosmos-Reason2", "Redis Streams", "MQTT", "LanceDB"],
        points: [
            "Architected VSS: a vLLM-served VLM (Cosmos-Reason2-2B) that describes scenes and verifies alerts, fed by custom C++ GStreamer plugins that keep frames on the GPU — 1.77 s p50 per 10 s window.",
            "Profiled decode, found launch overhead and 77% GPU idle time, and enabled CUDA graphs in vLLM: 4.7× decode throughput and verdict latency 1.95 → 0.41 s.",
            "Building natural-language video search on the edge: Cosmos-Embed1 scene embeddings + SigLIP2 object crops in LanceDB/SQLite behind FastAPI, 12 cameras at 5 fps on one RTX PRO 4000.",
        ],
    },
];

const Meta = ({ role, org, dates, place, live }) => (
    <div className="flex flex-col gap-1.5 lg:sticky lg:top-24">
        <span className="eyebrow">
            {live && <span className="live-dot" aria-hidden="true"></span>}
            {dates}
        </span>
        <h3 className="mt-1 font-display text-[22px] font-semibold leading-tight tracking-[-0.02em] text-ink">{role}</h3>
        <p className="text-[15px] text-body">{org}</p>
        <p className="font-mono text-[12px] text-label">{place}</p>
    </div>
);

const Experience = () => (
    <div className="flex flex-col">
        <Reveal className="mb-10">
            <Panel className="p-5 pt-7 md:p-7 md:pt-8">
                <ArchDiagram />
            </Panel>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 border-t border-line pt-10 lg:grid-cols-[260px_1fr] lg:gap-14">
            <Reveal>
                <Meta role="Software Development Engineer" org="Avathon (formerly SparkCognition)" dates="Jul 2025 — Present" place="Bengaluru, India" live />
            </Reveal>
            <div className="flex flex-col gap-6">
                {subsystems.map((sub) => (
                    <Reveal key={sub.tag}>
                        <Panel className="flex flex-col gap-5 p-6 md:p-8">
                            <div className="flex flex-col gap-3">
                                <span className="tag">{sub.tag}</span>
                                <h4 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">{sub.title}</h4>
                            </div>
                            <ul className="flex flex-col gap-3.5">
                                {sub.points.map((point) => (
                                    <li key={point} className="grid grid-cols-[14px_1fr] text-[15px] leading-[1.65] text-body">
                                        <span className="mt-[11px] h-[5px] w-[5px] border border-blueink" aria-hidden="true"></span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
                                {sub.stack.map((chip) => (
                                    <span key={chip} className="chip">{chip}</span>
                                ))}
                            </div>
                        </Panel>
                    </Reveal>
                ))}
            </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 border-t border-line pt-10 lg:grid-cols-[260px_1fr] lg:gap-14">
            <Reveal>
                <Meta role="Software Developer Intern" org="Hilti Technology Solutions" dates="May — Jul 2024" place="Pune, India" />
            </Reveal>
            <Reveal>
                <p className="max-w-[70ch] text-[15px] leading-[1.65] text-body">
                    Automated MSI installer builds with GitLab CI/CD, Docker and WiX — deployment went from{" "}
                    <span className="text-ink">2 hours to 10 minutes</span>. Wrote Selenium/C# UI tests on the Page Object Model.
                </p>
            </Reveal>
        </div>
    </div>
);

export default Experience;
