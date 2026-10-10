import { Bezel, Reveal } from "./ui";

const visionPath = ["GStreamer", "DeepStream", "TensorRT", "CUDA"];
const reasoningPath = ["vLLM", "PyTorch", "Redis / MQTT", "FastAPI"];
const toolbox = [
    "C++", "Python", "C", "Bash", "SQL",
    "Triton", "ONNX Runtime", "FP16 / INT8", "CUDA graphs",
    "Hugging Face", "OpenCV", "LanceDB",
    "Docker", "Kubernetes", "Kafka", "Linux", "GitLab CI/CD", "meson / ninja",
];

const PipelineRow = ({ label, nodes, ink = false, period, offset }) => (
    <div className="flex flex-col gap-4">
        <span className="font-mono text-[11px] text-label">{label}</span>
        <div className="overflow-x-auto pb-1">
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
                            className={`shrink-0 rounded-full px-5 py-2.5 text-[14px] font-medium ${
                                ink
                                    ? "bg-white text-ink shadow-[0_0_0_1px_rgba(17,18,20,0.1)]"
                                    : "bg-blueink text-white shadow-[0_10px_24px_-10px_rgba(47,79,224,0.6)]"
                            }`}
                        >
                            {node}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const Skills = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <Reveal className="md:col-span-8">
            <Bezel className="h-full" coreClassName="flex flex-col justify-center gap-10 p-8 md:p-10">
                <PipelineRow label="Vision pipeline — frames in" nodes={visionPath} period={2.6} offset={0} />
                <PipelineRow label="VLM serving & systems — verdicts out" nodes={reasoningPath} ink period={3.2} offset={0.4} />
            </Bezel>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-4">
            <Bezel className="h-full" coreClassName="flex flex-col gap-5 p-8 md:p-10">
                <span className="eyebrow">Also in the toolbox</span>
                <ul className="flex flex-wrap gap-2" aria-label="Other tools">
                    {toolbox.map((tool) => (
                        <li key={tool} className="chip">{tool}</li>
                    ))}
                </ul>
            </Bezel>
        </Reveal>
    </div>
);

export default Skills;
