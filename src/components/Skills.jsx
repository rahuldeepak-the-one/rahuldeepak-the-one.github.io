const visionPath = ["GSTREAMER", "DEEPSTREAM", "TENSORRT", "CUDA"];
const reasoningPath = ["VLLM", "PYTORCH", "REDIS / MQTT", "FASTAPI"];
const toolbox = [
    "C++", "Python", "C", "Bash", "SQL",
    "Triton", "ONNX Runtime", "FP16 / INT8", "CUDA graphs",
    "Hugging Face", "OpenCV", "LanceDB",
    "Docker", "Kubernetes", "Kafka", "Linux", "GitLab CI/CD", "meson / ninja",
];

const PipelineRow = ({ nodes, ink = false, period, offset }) => (
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
    <div className="det-card flex flex-col gap-9 px-9 py-10">
        <span className="det-tag">stack · frames flow left → right</span>

        {/* narrow screens scroll the pipeline horizontally */}
        <div className="flex flex-col gap-9 overflow-x-auto pt-1">
            <PipelineRow nodes={visionPath} period={2.6} offset={0} />
            <PipelineRow nodes={reasoningPath} ink period={3.2} offset={0.4} />
        </div>

        <div className="flex flex-wrap justify-between gap-2 font-mono text-[10px] text-label">
            <span>TOP: VISION PIPELINE</span>
            <span>BOTTOM: VLM SERVING &amp; SYSTEMS</span>
        </div>

        <ul className="flex flex-wrap gap-2 border-t border-dashed border-blueink/30 pt-6" aria-label="Also use">
            {toolbox.map((tool) => (
                <li key={tool} className="chip">{tool}</li>
            ))}
        </ul>
    </div>
);

export default Skills;
