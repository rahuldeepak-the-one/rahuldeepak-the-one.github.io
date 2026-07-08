const avathonChips = ["C++ / GSTREAMER PLUGINS", "TENSORRT FP16", "32 PROD CONFIGS", "2.7× CAMERA CAPACITY"];

const Experience = () => (
    <div className="flex flex-col gap-7">
        {/* FIG. A1 — current role */}
        <article className="fig-card p-8">
            <span className="fig-tag">FIG. A1 — CURRENT</span>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-[20px] font-bold text-ink">
                    Software Development Engineer — Avathon
                </h3>
                <span className="font-mono text-[11px] text-blueink">JUL 2025 – PRESENT · BENGALURU</span>
            </div>
            <p className="mt-3 max-w-[900px] text-[14px] leading-[1.75] text-body">
                Core engineer on the ground-up rewrite of IRIS, a production video-analytics platform on
                10+ sites (DeepStream 6.2→9.0). Root-caused a total detection failure to a TensorRT
                miscompile + silent JIT failure, restoring 6,000+ detections. Architected VSS — a
                vLLM-served VLM+LLM layer over Kafka/Redis with GPU-resident embeddings.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
                {avathonChips.map((chip) => (
                    <span key={chip} className="chip">{chip}</span>
                ))}
            </div>
        </article>

        {/* FIG. A2 — internship, slim row */}
        <article className="fig-card flex flex-wrap items-baseline justify-between gap-4 px-8 py-[22px]">
            <span className="fig-tag text-label">FIG. A2</span>
            <h3 className="font-display text-[16px] font-bold text-ink">
                SDE Intern — Hilti{" "}
                <span className="font-body text-[13px] font-medium text-label">
                    · CI/CD installer pipeline, deploys 2h → 10min
                </span>
            </h3>
            <span className="font-mono text-[11px] text-label">MAY – JUL 2024</span>
        </article>
    </div>
);

export default Experience;
