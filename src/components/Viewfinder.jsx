import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hero signature: a stylised multi-camera monitor. Abstract silhouettes get
 * detection boxes (detector stage) and a VLM verdict line types underneath
 * (reasoning stage) — the two halves of the work, shown instead of told.
 * Purely decorative; everything stills under prefers-reduced-motion.
 */
const CAMS = [
    { id: "CAM-01", zone: "DOCK A", objs: [{ cls: "person", conf: 0.97, x: 18, y: 30, w: 14, h: 52, shape: "person" }, { cls: "forklift", conf: 0.91, x: 52, y: 44, w: 34, h: 40, shape: "box" }] },
    { id: "CAM-04", zone: "GATE 2", objs: [{ cls: "vehicle", conf: 0.94, x: 14, y: 46, w: 44, h: 34, shape: "box" }, { cls: "person", conf: 0.88, x: 68, y: 28, w: 13, h: 50, shape: "person" }] },
    { id: "CAM-09", zone: "LINE 3", objs: [{ cls: "person", conf: 0.95, x: 40, y: 30, w: 15, h: 56, shape: "person" }, { cls: "no-helmet", conf: 0.82, x: 41, y: 30, w: 13, h: 14, shape: "none", alert: true }] },
    { id: "CAM-12", zone: "YARD", objs: [{ cls: "person", conf: 0.93, x: 22, y: 34, w: 12, h: 46, shape: "person" }, { cls: "person", conf: 0.9, x: 58, y: 38, w: 12, h: 44, shape: "person" }] },
];

const VERDICTS = [
    { cam: "CAM-09", text: "worker on LINE 3 without a helmet near the press — alert confirmed", ms: "0.41 s" },
    { cam: "CAM-01", text: "forklift reversing while a person stands in the aisle — alert confirmed", ms: "0.39 s" },
    { cam: "CAM-04", text: "vehicle stopped at the gate, driver at the barrier — no alert", ms: "0.44 s" },
];

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const Silhouette = ({ o }) => {
    if (o.shape === "person")
        return (
            <div className="absolute flex flex-col items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%` }}>
                <div className="aspect-square w-[46%] rounded-full bg-ink/15"></div>
                <div className="mt-[6%] w-[80%] flex-1 rounded-t-[40%] rounded-b-[6px] bg-ink/15"></div>
            </div>
        );
    if (o.shape === "box")
        return (
            <div
                className="absolute rounded-[4px] bg-ink/12 transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ left: `${o.x + 2}%`, top: `${o.y + 6}%`, width: `${o.w - 4}%`, height: `${o.h - 10}%` }}
            ></div>
        );
    return null;
};

const Tile = ({ cam, objs, tick }) => {
    return (
        <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-sunken">
            {/* floor perspective */}
            <svg className="absolute inset-0 h-full w-full text-ink/[0.07]" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 52 H100 M0 60 H100 M0 68 H100 M20 75 L38 45 M50 75 L50 45 M80 75 L62 45" stroke="currentColor" strokeWidth="0.4" fill="none" />
            </svg>
            {objs.map((o, i) => (
                <Silhouette key={`s${i}`} o={o} />
            ))}
            {objs.map((o, i) => (
                <div
                    key={`b${i}`}
                    className={`absolute transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        o.alert ? "border-[1.5px] border-[#f04438]" : "border-[1.5px] border-blueink"
                    }`}
                    style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%` }}
                >
                    <span
                        className={`absolute -top-[15px] left-[-1.5px] whitespace-nowrap rounded-t-[2px] px-1 font-mono text-[9px] leading-[14px] ${
                            o.alert ? "bg-[#f04438] text-white" : "bg-blueink text-on-accent"
                        }`}
                    >
                        {o.cls}<span className="hidden sm:inline"> {o.conf.toFixed(2)}</span>
                    </span>
                </div>
            ))}
            <div className="absolute left-2 top-1.5 flex items-center gap-1.5 font-mono text-[9px] text-label">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f04438]" style={{ opacity: tick % 2 ? 1 : 0.35 }}></span>
                {cam.id} · {cam.zone}
            </div>
        </div>
    );
};

const Viewfinder = () => {
    const reduced = useReducedMotion();
    const [tick, setTick] = useState(0);
    const [cams, setCams] = useState(CAMS);
    const [v, setV] = useState(0);
    const [typed, setTyped] = useState(reduced ? VERDICTS[0].text.length : 0);
    const [clock, setClock] = useState(() => new Date());

    // drift detections + blink REC
    useEffect(() => {
        if (reduced) return undefined;
        const id = setInterval(() => {
            setTick((t) => t + 1);
            setClock(new Date());
            setCams((prev) =>
                prev.map((c, ci) => ({
                    ...c,
                    objs: c.objs.map((o, oi) => {
                        const base = CAMS[ci].objs[oi];
                        const dx = o.shape === "none" ? 0 : (Math.random() - 0.5) * 6;
                        const nx = clamp(o.x + dx, base.x - 6, base.x + 6);
                        return { ...o, x: o.shape === "none" ? c.objs[0].x + 1 : nx, conf: clamp(base.conf + (Math.random() - 0.5) * 0.04, 0.5, 0.99) };
                    }),
                }))
            );
        }, 1200);
        return () => clearInterval(id);
    }, [reduced]);

    // type the VLM verdict, hold, then move to the next
    useEffect(() => {
        if (reduced) return undefined;
        const full = VERDICTS[v].text.length;
        if (typed < full) {
            const id = setTimeout(() => setTyped((n) => n + 1), 22);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => {
            setV((x) => (x + 1) % VERDICTS.length);
            setTyped(0);
        }, 2600);
        return () => clearTimeout(id);
    }, [typed, v, reduced]);

    const verdict = VERDICTS[v];
    const done = typed >= verdict.text.length;
    const time = clock.toLocaleTimeString("en-GB", { hour12: false });

    return (
        <div className="panel frame p-3 sm:p-4" aria-hidden="true">
            <div className="mb-3 flex items-center justify-between px-1 font-mono text-[10px] text-label sm:text-[11px]">
                <span className="flex items-center gap-2">
                    <span className="live-dot"></span>
                    LIVE · 4 OF 99 STREAMS
                </span>
                <span className="tabular-nums">{time} IST</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {cams.map((c) => (
                    <Tile key={c.id} cam={c} objs={c.objs} tick={tick} />
                ))}
            </div>

            <div className="mt-3 rounded-[6px] bg-sunken px-3 py-2.5 font-mono text-[11px] leading-[1.6] sm:text-[12px]">
                <div className="flex items-center justify-between text-label">
                    <span>
                        <span className="text-blueink">VLM</span> › {verdict.cam}
                    </span>
                    <span className={`tabular-nums transition-opacity ${done ? "opacity-100" : "opacity-0"}`}>{verdict.ms}</span>
                </div>
                <p className="mt-1 min-h-[3.2em] text-ink">
                    {verdict.text.slice(0, typed)}
                    {!done && <span className="ml-px inline-block h-[1em] w-[6px] translate-y-[2px] bg-blueink"></span>}
                </p>
            </div>
        </div>
    );
};

export default Viewfinder;
