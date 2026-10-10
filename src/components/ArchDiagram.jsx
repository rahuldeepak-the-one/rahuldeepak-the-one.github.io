/**
 * Capability sketch — detector models and VLMs working together on live
 * video. Deliberately generic: no internal system names or topology.
 * Edge "flow" dashes are CSS-animated, so prefers-reduced-motion stills them.
 */
const W = 190;
const H = 84;
const Y = 60;

const nodes = [
    { x: 20, title: "Video streams", sub: "live cameras", kind: "io" },
    { x: 300, title: "Detector models", sub: "TensorRT · real-time", kind: "hot" },
    { x: 580, title: "VLM reasoning", sub: "vLLM · verify + describe", kind: "hot" },
    { x: 860, title: "Alerts & search", sub: "verified events", kind: "io" },
];

const edges = [
    { x1: 210, x2: 300, label: "frames" },
    { x1: 490, x2: 580, label: "detections" },
    { x1: 770, x2: 860, label: "verdicts" },
];

const ArchDiagram = () => (
    <figure className="flex flex-col gap-3">
        <div className="overflow-x-auto">
            <svg viewBox="0 0 1070 170" className="w-full min-w-[640px]" role="img" aria-labelledby="arch-title">
                <title id="arch-title">
                    Live video streams go to detector models running on TensorRT, detections go to a vLLM-served
                    vision-language model that verifies and describes them, and verified events become alerts and search.
                </title>
                <defs>
                    <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                        <path d="M0 0 L10 5 L0 10 z" fill="#2f4fe0" />
                    </marker>
                </defs>

                {/* capability labels over the two model stages */}
                <text x={395} y={36} textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="1.5" fill="#2f4fe0">
                    SEE
                </text>
                <text x={675} y={36} textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="1.5" fill="#2f4fe0">
                    UNDERSTAND
                </text>

                {edges.map((e) => (
                    <g key={e.label}>
                        <path d={`M${e.x1} ${Y + H / 2} H${e.x2}`} stroke="rgba(47,79,224,0.35)" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
                        <path d={`M${e.x1} ${Y + H / 2} H${e.x2 - 4}`} stroke="#2f4fe0" strokeWidth="1.5" className="arch-flow" />
                        <text x={(e.x1 + e.x2) / 2} y={Y + H / 2 + 22} textAnchor="middle" className="font-mono" fontSize="10" fill="#7a7e8b">
                            {e.label}
                        </text>
                    </g>
                ))}

                {nodes.map((n) => {
                    const hot = n.kind === "hot";
                    return (
                        <g key={n.title}>
                            <rect
                                x={n.x}
                                y={Y}
                                width={W}
                                height={H}
                                rx="16"
                                fill={hot ? "#2f4fe0" : "#f2f2ef"}
                                stroke={hot ? "#2f4fe0" : "rgba(17,18,20,0.15)"}
                                strokeDasharray={hot ? undefined : "4 4"}
                            />
                            <text x={n.x + 18} y={Y + 36} className="font-display" fontSize="16" fontWeight="600" fill={hot ? "#ffffff" : "#111214"}>
                                {n.title}
                            </text>
                            <text x={n.x + 18} y={Y + 58} className="font-mono" fontSize="11" fill={hot ? "rgba(255,255,255,0.8)" : "#7a7e8b"}>
                                {n.sub}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    </figure>
);

export default ArchDiagram;
