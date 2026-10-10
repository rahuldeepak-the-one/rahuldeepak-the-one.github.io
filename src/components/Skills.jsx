const skillGroups = [
    { h: "Seeing — video on the GPU", items: "GStreamer · DeepStream · TensorRT · CUDA · ONNX Runtime · FP16 / INT8 · OpenCV" },
    { h: "Understanding — models", items: "vLLM · PyTorch · Hugging Face · Triton · CUDA graphs · LanceDB" },
    { h: "Shipping — systems", items: "C++ · Python · Redis / MQTT · Kafka · FastAPI · Docker · Kubernetes · GitLab CI/CD" },
];

const Skills = () => (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[240px_minmax(0,1fr)]">
        <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] tracking-[1px] text-accent">TOOLS</span>
            <h2 className="font-display text-[26px] font-bold text-white">What I use</h2>
        </div>
        <div className="flex flex-col">
            {skillGroups.map((g) => (
                <div key={g.h} className="grid grid-cols-1 gap-2 border-t border-line py-4 lg:grid-cols-[260px_1fr] lg:gap-6">
                    <span className="font-display text-[15px] font-semibold text-white">{g.h}</span>
                    <span className="text-[15px] leading-[1.6] text-soft">{g.items}</span>
                </div>
            ))}
        </div>
    </div>
);

export default Skills;
