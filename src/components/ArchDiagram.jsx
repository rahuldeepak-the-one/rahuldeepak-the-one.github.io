/**
 * Capability strip — detector models and VLMs working together on live
 * video. Horizontal on desktop, vertical on phones (no sideways scroll).
 * Deliberately generic: no internal system names or topology.
 */
const nodes = [
    { title: "Video streams", sub: "live RTSP cameras", hot: false },
    { title: "Detector models", sub: "DeepStream · TensorRT", hot: true, stage: "See" },
    { title: "VLM reasoning", sub: "vLLM · verify + describe", hot: true, stage: "Understand" },
    { title: "Alerts & search", sub: "verified events", hot: false },
];
const edges = ["frames", "detections", "verdicts"];

const Node = ({ n }) => (
    <div
        className={`relative flex-1 rounded-[8px] px-4 py-3.5 ${
            n.hot ? "bg-blueink text-on-accent" : "bg-sunken text-ink shadow-[inset_0_0_0_1px_var(--color-line)]"
        }`}
    >
        {n.stage && (
            <span className="absolute -top-[9px] right-3 rounded-[3px] bg-surface px-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-blueink shadow-[0_0_0_1px_var(--color-line)]">
                {n.stage}
            </span>
        )}
        <p className="text-[15px] font-semibold tracking-[-0.01em]">{n.title}</p>
        <p className={`mt-0.5 font-mono text-[11px] ${n.hot ? "opacity-80" : "text-label"}`}>{n.sub}</p>
    </div>
);

const Edge = ({ label }) => (
    <div className="flex shrink-0 items-center justify-center gap-2 md:w-[92px] md:flex-col md:gap-1">
        <span className="flow--v h-6 w-[1.5px] md:hidden" aria-hidden="true"></span>
        <span className="flow hidden h-[1.5px] w-full md:block" aria-hidden="true"></span>
        <span className="font-mono text-[10px] text-label">{label}</span>
    </div>
);

const ArchDiagram = () => (
    <figure>
        <figcaption className="sr-only">
            Live video streams go to detector models on TensorRT; detections go to a vLLM-served vision-language
            model that verifies and describes them; verified events become alerts and search.
        </figcaption>
        <div className="flex flex-col items-stretch md:flex-row md:items-center">
            {nodes.map((n, i) => (
                <div key={n.title} className="contents">
                    {i > 0 && <Edge label={edges[i - 1]} />}
                    <Node n={n} />
                </div>
            ))}
        </div>
    </figure>
);

export default ArchDiagram;
