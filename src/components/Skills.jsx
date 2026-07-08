const topTrace = ["CUDA", "TENSORRT", "DEEPSTREAM", "GSTREAMER"];
const bottomTrace = ["VLLM", "PYTORCH", "KAFKA / REDIS", "C++ / PYTHON"];

const CircuitRow = ({ nodes, ink = false, period, offset }) => (
    <div className="flex min-w-max items-center md:min-w-0" role="list">
        {nodes.map((node, i) => (
            <span key={node} className="contents">
                {i > 0 && (
                    <span className={`trace ${ink ? "trace--ink" : ""}`}>
                        <span
                            className={`trace-dot ${ink ? "trace-dot--ink" : ""}`}
                            style={{ animationDuration: `${period}s`, animationDelay: `${offset + i * 0.8}s` }}
                        ></span>
                    </span>
                )}
                <span
                    role="listitem"
                    className={`shrink-0 border-[1.5px] bg-white px-[18px] py-2.5 font-mono text-[12px] font-bold ${
                        ink ? "border-ink text-ink" : "border-blueink text-blueink"
                    }`}
                >
                    {node}
                </span>
            </span>
        ))}
    </div>
);

const Skills = () => (
    <div className="fig-card flex flex-col gap-9 px-9 py-10">
        <span className="fig-tag">FIG. C1 — INFERENCE PATH</span>

        {/* narrow screens scroll the schematic horizontally */}
        <div className="flex flex-col gap-9 overflow-x-auto pt-1">
            <CircuitRow nodes={topTrace} period={2.6} offset={0} />
            <CircuitRow nodes={bottomTrace} ink period={3.2} offset={0.4} />
        </div>

        <div className="flex flex-wrap justify-between gap-2 font-mono text-[10px] text-label">
            <span>TOP TRACE: EDGE INFERENCE PIPELINE</span>
            <span>BOTTOM TRACE: MODEL SERVING &amp; SYSTEMS</span>
        </div>
    </div>
);

export default Skills;
