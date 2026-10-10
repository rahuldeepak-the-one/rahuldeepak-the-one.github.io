/**
 * Avathon system architecture — IRIS (DeepStream vision pipeline) feeding
 * VSS (vLLM vision-language layer + edge video search). Inline SVG so it
 * scales crisply; narrow screens scroll it horizontally. Edge "flow" dashes
 * are CSS-animated, so prefers-reduced-motion stills them.
 */
const W = 140;
const H = 76;

const nodes = [
    { id: "cams", x: 20, y: 100, title: "Cameras", sub: ["99 live streams", "on one GPU"], kind: "io" },

    { id: "decode", x: 180, y: 100, title: "Decode", sub: ["batched streams"] },
    { id: "gate", x: 350, y: 100, title: "Activity gate", sub: ["per-camera", "2.7× capacity"] },
    { id: "detect", x: 520, y: 100, title: "Detector", sub: ["TensorRT · DEIMv2", "+ MSDA plugin"] },
    { id: "track", x: 690, y: 100, title: "Tracker", sub: ["multi-object"] },
    { id: "plugins", x: 860, y: 100, title: "Use-case plugins", sub: ["12 modules", "stable ABI · dlopen"] },
    { id: "send", x: 1030, y: 100, title: "Alert sender", sub: ["16 libcurl workers", "15% → 98% delivered"] },

    { id: "tap", x: 180, y: 330, title: "Frame tap", sub: ["custom C++ plugins", "GPU-resident frames"] },
    { id: "bus", x: 370, y: 330, title: "Redis Streams", sub: ["+ MQTT"] },
    { id: "vlm", x: 560, y: 330, title: "vLLM · VLM", sub: ["Cosmos-Reason2-2B", "CUDA graphs · 4.7×"], kind: "hot" },
    { id: "verdict", x: 750, y: 330, title: "Verdicts", sub: ["scene descriptions", "0.41 s per verdict"] },

    { id: "embed", x: 370, y: 430, title: "Embeddings", sub: ["Cosmos-Embed1 + SigLIP2"], h: 56 },
    { id: "store", x: 560, y: 430, title: "LanceDB / SQLite", sub: ["scene + object index"], h: 56 },
    { id: "search", x: 750, y: 430, title: "FastAPI search", sub: ["12 cams @ 5 fps"], h: 56 },

    { id: "cloud", x: 1030, y: 330, title: "Cloud", sub: ["alerts + verdicts"], kind: "io" },
];

const edges = [
    { d: "M160 138 H180" },
    { d: "M320 138 H350" },
    { d: "M490 138 H520" },
    { d: "M660 138 H690" },
    { d: "M830 138 H860" },
    { d: "M1000 138 H1030" },
    { d: "M1100 176 V330", label: "alerts", lx: 1108, ly: 284 },
    { d: "M250 176 V330", label: "frames", lx: 258, ly: 284 },
    { d: "M930 176 V270 H440 V330", label: "alerts to verify", lx: 600, ly: 286, dashed: true },
    { d: "M320 368 H370" },
    { d: "M510 368 H560" },
    { d: "M700 368 H750" },
    { d: "M890 368 H1030" },
    { d: "M250 406 V458 H370" },
    { d: "M510 458 H560" },
    { d: "M700 458 H750" },
];

const Node = ({ x, y, title, sub, kind, h = H }) => {
    const hot = kind === "hot";
    const io = kind === "io";
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={W}
                height={h}
                rx="14"
                fill={hot ? "#2f4fe0" : io ? "#f2f2ef" : "#ffffff"}
                stroke={hot ? "#2f4fe0" : "rgba(17,18,20,0.12)"}
                strokeDasharray={io ? "4 4" : undefined}
            />
            <text x={x + 14} y={y + 26} className="font-display" fontSize="14" fontWeight="600" fill={hot ? "#ffffff" : "#111214"}>
                {title}
            </text>
            {sub.map((line, i) => (
                <text
                    key={line}
                    x={x + 14}
                    y={y + 45 + i * 15}
                    className="font-mono"
                    fontSize="10"
                    fill={hot ? "rgba(255,255,255,0.8)" : "#7a7e8b"}
                >
                    {line}
                </text>
            ))}
        </g>
    );
};

const Group = ({ x, y, w, h, label, labelX = x + 20 }) => (
    <g>
        <rect x={x} y={y} width={w} height={h} rx="24" fill="rgba(47,79,224,0.03)" stroke="rgba(47,79,224,0.25)" strokeDasharray="5 5" />
        <text x={labelX} y={y + 26} className="font-mono" fontSize="11" letterSpacing="1.5" fill="#2f4fe0">
            {label}
        </text>
    </g>
);

const ArchDiagram = () => (
    <figure className="flex flex-col gap-4">
        <div className="overflow-x-auto">
            <svg
                viewBox="0 0 1200 510"
                className="w-full min-w-[900px]"
                role="img"
                aria-labelledby="arch-title arch-desc"
            >
                <title id="arch-title">Avathon video-analytics architecture</title>
                <desc id="arch-desc">
                    Camera streams enter IRIS, a DeepStream 9.0 pipeline: decode, per-camera activity gate, TensorRT detector,
                    tracker, use-case plugins and an alert sender to the cloud. A frame tap sends GPU-resident frames to VSS over
                    Redis Streams and MQTT, where a vLLM-served VLM verifies alerts and writes scene descriptions, and an
                    embedding path feeds LanceDB for edge video search through FastAPI.
                </desc>
                <defs>
                    <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0 0 L10 5 L0 10 z" fill="#2f4fe0" />
                    </marker>
                </defs>

                <Group x={160} y={40} w={1030} h={220} label="IRIS · DEEPSTREAM 9.0 · C++/GSTREAMER CORE" />
                <Group x={160} y={290} w={760} h={212} label="VSS · VISION-LANGUAGE + EDGE SEARCH" labelX={470} />

                {/* stall watchdog spans the whole pipeline */}
                <rect x={180} y={200} width={990} height={28} rx="14" fill="none" stroke="rgba(17,18,20,0.15)" strokeDasharray="3 4" />
                <text x={196} y={218} className="font-mono" fontSize="10" fill="#7a7e8b">
                    global-stall watchdog · 40 ms batch-timeout guard · 99/99 streams @ 584 fps
                </text>

                {edges.map((e) => (
                    <g key={e.d}>
                        <path d={e.d} fill="none" stroke="rgba(47,79,224,0.35)" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
                        {!e.dashed && <path d={e.d} fill="none" stroke="#2f4fe0" strokeWidth="1.5" className="arch-flow" />}
                        {e.dashed && (
                            <path d={e.d} fill="none" stroke="#2f4fe0" strokeWidth="1.5" strokeDasharray="4 5" className="arch-flow arch-flow--slow" />
                        )}
                        {e.label && (
                            <text x={e.lx} y={e.ly} className="font-mono" fontSize="10" fill="#2f4fe0">
                                {e.label}
                            </text>
                        )}
                    </g>
                ))}

                {nodes.map((n) => (
                    <Node key={n.id} {...n} />
                ))}
            </svg>
        </div>
        <figcaption className="px-2 font-mono text-[11px] text-label">
            Simplified system view · numbers from production benchmarks · scroll sideways on small screens
        </figcaption>
    </figure>
);

export default ArchDiagram;
