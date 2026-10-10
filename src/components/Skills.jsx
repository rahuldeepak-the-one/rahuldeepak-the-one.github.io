import { Panel, Reveal } from "./ui";

const groups = [
    { k: "Inference & edge", items: ["NVIDIA DeepStream", "TensorRT", "CUDA · CUDA graphs", "GStreamer", "Triton", "ONNX Runtime", "FP16 / INT8"] },
    { k: "LLM & ML", items: ["vLLM", "PyTorch", "VLMs / LLMs", "Hugging Face", "OpenCV", "LanceDB"] },
    { k: "Systems & infra", items: ["Docker", "Kubernetes", "Kafka", "Redis · MQTT", "Linux", "GitLab CI/CD", "meson / ninja"] },
    { k: "Languages", items: ["C++", "Python", "C", "Bash", "SQL"] },
];

const background = [
    { k: "Education", v: "B.Tech, Computer Science & Engineering", sub: "IIT Bombay · 2021 – 2025" },
    { k: "Entrance", v: "JEE Advanced AIR 709 · JEE Main AIR 157", sub: "NTSE Scholar" },
    {
        k: "Certification",
        v: "Deep Learning Specialization",
        sub: "DeepLearning.AI · 2025 ↗",
        href: "https://coursera.org/verify/specialization/TIOE0Y7QDS0M",
    },
];

const Skills = () => (
    <div className="flex flex-col gap-5">
        <Reveal>
            <Panel className="grid grid-cols-2 lg:grid-cols-4">
                {groups.map((g, i) => (
                    <div
                        key={g.k}
                        className={`flex flex-col gap-4 p-6 md:p-7 ${i % 2 ? "border-l border-line" : ""} ${
                            i > 1 ? "border-t border-line lg:border-t-0" : ""
                        } ${i === 2 ? "lg:border-l" : ""}`}
                    >
                        <span className="eyebrow eyebrow--accent">{g.k}</span>
                        <ul className="flex flex-col gap-2">
                            {g.items.map((it) => (
                                <li key={it} className="text-[15px] text-ink">{it}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Panel>
        </Reveal>

        <Reveal>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {background.map((b) => {
                    const inner = (
                        <>
                            <span className="eyebrow">{b.k}</span>
                            <p className="mt-3 text-[16px] font-medium leading-snug text-ink">{b.v}</p>
                            <p className="mt-1 font-mono text-[12px] text-label">{b.sub}</p>
                        </>
                    );
                    return b.href ? (
                        <Panel as="a" key={b.k} href={b.href} target="_blank" rel="noopener noreferrer" hover className="block p-6">
                            {inner}
                        </Panel>
                    ) : (
                        <Panel key={b.k} className="p-6">
                            {inner}
                        </Panel>
                    );
                })}
            </div>
        </Reveal>
    </div>
);

export default Skills;
