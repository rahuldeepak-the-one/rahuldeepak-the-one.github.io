import { Reveal } from "./ui";

const stats = [
    { value: "99/99", label: "Live streams, one GPU", sub: "584 aggregate fps · RTX PRO 6000" },
    { value: "4.7×", label: "VLM decode throughput", sub: "41 → 193 tok/s · CUDA graphs" },
    { value: "2.7×", label: "Cameras per GPU", sub: "per-camera activity gating" },
    { value: "98%", label: "Alert delivery", sub: "up from 15% · 0.5 s p50 lag" },
];

/** Telemetry strip — one bordered row, four readouts. */
const StatsBar = () => (
    <Reveal>
        <dl className="panel grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
                <div
                    key={s.label}
                    className={`flex flex-col gap-3 p-5 md:p-7 ${i % 2 ? "border-l border-line" : ""} ${
                        i > 1 ? "border-t border-line lg:border-t-0" : ""
                    } ${i === 2 ? "lg:border-l" : ""}`}
                >
                    <dt className="eyebrow">{s.label}</dt>
                    <dd className="font-display text-[clamp(34px,4.2vw,52px)] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
                        {s.value}
                    </dd>
                    <dd className="font-mono text-[12px] text-label">{s.sub}</dd>
                </div>
            ))}
        </dl>
    </Reveal>
);

export default StatsBar;
