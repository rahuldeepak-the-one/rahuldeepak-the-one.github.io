import NeuralSky from "./NeuralSky";

const panelSky = {
    bgN: 160,
    gap: 1400,
    seg: 300,
    flow: true,
    noLabels: true,
    clusters: [
        { cx: 0.32, cy: 0.5, n: 11, r: 0.11, words: ["DeepStream 9", "plugin ABI", "2.7× capacity", "TensorRT fix", "98% alerts"] },
        { cx: 0.68, cy: 0.5, n: 11, r: 0.11, words: ["vLLM", "Cosmos-Reason2", "CUDA graphs", "LanceDB", "SigLIP2"] },
    ],
};

const roles = [
    {
        head: "IRIS — the part that sees",
        title: "Video-analytics platform, DeepStream 6.2 → 9.0",
        plain: "Rebuilt the engine that decodes camera feeds and runs detection models on them.",
        why: "It decides how many cameras one machine can watch, and how reliably.",
        big: "99 streams",
        bigSub: "on one GPU at 584 fps, 2.7× more cameras per GPU",
        pts: [
            ["2.7× cameras per GPU", " by skipping work on cameras where nothing is happening; 99/99 streams at 584 fps on one RTX PRO 6000."],
            ["3 libraries, 12 modules", " behind a stable plugin ABI, so each use case ships on its own."],
            ["Fixed a TensorRT miscompile", " in DEIMv2 attention with ONNX graph surgery, back to 98.7% counting accuracy."],
            ["Alerts 15% → 98%", " delivered at 0.5 s p50, plus a watchdog for GPU stalls."],
        ],
    },
    {
        head: "VSS — the part that understands",
        title: "VLM reasoning & edge video search",
        plain: "Designed the layer where a vision-language model watches clips and explains or double-checks what happened.",
        why: "It turns \"motion detected\" into \"a person left a bag by the door\", and cuts false alarms.",
        big: "4.7×",
        bigSub: "faster VLM decode (41 → 193 tok/s), verdicts in 0.41 s",
        pts: [
            ["4.7× faster decoding", " (41 → 193 tok/s) and 79% lower verdict latency by enabling CUDA graphs after profiling."],
            ["Cosmos-Reason2 on vLLM", " fed by custom GStreamer plugins that keep frames on the GPU; 1.77 s p50 per 10 s clip."],
            ["Edge video search", " with Cosmos-Embed1 + SigLIP2, LanceDB and FastAPI: 12 cameras on one RTX PRO 4000."],
        ],
    },
    {
        head: "BEFORE AVATHON",
        title: "SDE Intern, Hilti",
        meta: "May – Jul 2024 · Pune",
        plain: "Built the release pipeline end to end: GitLab CI/CD, Docker builds and a WiX installer, so every commit could become a shippable Windows release.",
        why: "Releases stopped being a half-day manual chore. The team could ship fixes the same hour, and every build was reproducible.",
        big: "2 h → 10 min",
        bigSub: "per deploy, after automating build, packaging and install",
    },
];

const Label = ({ children }) => <span className="font-mono text-[12px] font-semibold leading-[1.6] text-dim md:pt-0.5">{children}</span>;

const RoleCard = ({ role }) => (
    <article className="grid grid-cols-1 items-start gap-6 rounded-md border border-line-2 bg-night-2 p-6 md:p-8 lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:gap-10">
        <div className="flex flex-col gap-2">
            <span className="font-mono text-[12px] font-bold text-accent">{role.head}</span>
            <h3 className="font-display text-[20px] font-semibold leading-[1.3] text-white">{role.title}</h3>
            {role.meta && <span className="text-[14px] text-mute">{role.meta}</span>}
        </div>
        <div className="flex flex-col gap-[14px]">
            <div className="grid grid-cols-1 gap-x-[14px] gap-y-1 text-[15px] leading-[1.6] text-star sm:grid-cols-[96px_1fr] sm:gap-y-2.5">
                <Label>WHAT</Label>
                <span className="mb-2 sm:mb-0">{role.plain}</span>
                <Label>WHY IT MATTERS</Label>
                <span>{role.why}</span>
            </div>
            {role.pts && (
                <div className="flex flex-col gap-2.5 border-t border-line pt-[14px]">
                    {role.pts.map(([lead, rest]) => (
                        <p key={lead} className="text-[15px] leading-[1.65] text-[#b9bdc9]">
                            <b className="font-bold text-white">{lead}</b>
                            {rest}
                        </p>
                    ))}
                </div>
            )}
        </div>
        <div className="flex flex-col gap-1.5 border-line-2 max-lg:border-t max-lg:pt-5 lg:border-l lg:pl-6">
            <span className="font-display text-[36px] font-extrabold tracking-[-1px] text-white">{role.big}</span>
            <span className="text-[14px] leading-[1.5] text-mute">{role.bigSub}</span>
        </div>
    </article>
);

const Experience = () => (
    <>
        <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] tracking-[1px] text-accent">WORK</span>
                <h2 className="font-display text-[32px] font-bold leading-[1.2] tracking-[-1px] text-white">Software Development Engineer, Avathon</h2>
            </div>
            <span className="text-[14px] text-mute">Formerly SparkCognition · Jul 2025 – now · Bengaluru</span>
        </div>

        <div className="relative mb-8 mt-6 h-[260px] overflow-hidden rounded-md border border-line bg-night-3 md:h-[320px]">
            <div className="absolute inset-0">
                <NeuralSky {...panelSky} />
            </div>
            <div className="pointer-events-none absolute left-6 top-1/2 flex -translate-y-1/2 flex-col gap-1">
                <span className="font-mono text-[12px] font-semibold text-accent">IN</span>
                <span className="text-[15px] font-semibold text-white">Live camera<br />feeds</span>
            </div>
            <div className="pointer-events-none absolute right-6 top-1/2 flex -translate-y-1/2 flex-col items-end gap-1 text-right">
                <span className="font-mono text-[12px] font-semibold text-accent">OUT</span>
                <span className="text-[15px] font-semibold text-white">Alerts in<br />plain language</span>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-[18px] grid grid-cols-2">
                {[["IRIS sees", "video → detections"], ["VSS understands", "detections → language"]].map(([name, sub]) => (
                    <div key={name} className="flex flex-col items-center gap-0.5">
                        <span className="font-display text-[16px] font-bold text-white">{name}</span>
                        <span className="text-[13px] text-mute">{sub}</span>
                    </div>
                ))}
            </div>
            <span className="pointer-events-none absolute left-1/2 top-[18px] hidden -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-dim md:block pointer-coarse:hidden">
                every signal flows left to right · hover to trace connections
            </span>
        </div>

        <div className="flex flex-col gap-5">
            {roles.map((role) => (
                <RoleCard key={role.title} role={role} />
            ))}
        </div>
    </>
);

export default Experience;
