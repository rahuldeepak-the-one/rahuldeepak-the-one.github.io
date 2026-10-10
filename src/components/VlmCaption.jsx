import { useEffect, useState } from "react";

/**
 * VLM caption bar — narrates whichever section is on screen, typed out like
 * streamed tokens. Captions are hand-written; no model runs.
 */

const CAPTIONS = {
    hero: "a name in large type over drifting electrons; three buttons invite the viewer further in.",
    experience: "an engineer's current role: a video pipeline rebuilt on DeepStream 9, and a vision-language model checking what the cameras saw.",
    projects: "four project schematics: a local AI terminal, a live church translator, a skin-lesion classifier and a vehicle speed estimator.",
    skills: "two signal paths. frames flow through GStreamer into CUDA; verdicts flow out through vLLM.",
    education: "credentials: computer science at IIT Bombay, JEE ranks 709 and 157, a deep learning certificate.",
    notes: "a short register of field notes on DeepStream pipelines and edge-GPU benchmarks.",
    contact: "a title block awaiting approval. verdict: worth emailing. confidence 0.99.",
};

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => window.matchMedia("(hover: hover)").matches;

const VlmCaption = () => {
    const [caption, setCaption] = useState({ section: "hero", latency: "0.41" });
    const [typed, setTyped] = useState(0);
    // on touch screens the bar would cover content, so it starts minimised
    const [open, setOpen] = useState(canHover);
    const { section, latency } = caption;
    const text = CAPTIONS[section] || "";

    // which section is on screen; a new section resets the stream
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    setCaption((c) =>
                        c.section === entry.target.id
                            ? c
                            : { section: entry.target.id, latency: (0.32 + Math.random() * 0.18).toFixed(2) }
                    );
                    setTyped(0);
                }
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        Object.keys(CAPTIONS).forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    // type the caption out, like streamed VLM tokens
    useEffect(() => {
        if (reducedMotion()) return undefined;
        const timer = setInterval(() => {
            setTyped((n) => {
                if (n >= text.length) clearInterval(timer);
                return Math.min(n + 2, text.length);
            });
        }, 18);
        return () => clearInterval(timer);
    }, [text]);

    const shown = reducedMotion() ? text : text.slice(0, typed);

    if (!open) {
        return (
            <button onClick={() => setOpen(true)} className="vlm-bar vlm-bar--min" aria-label="Show VLM caption">
                <span className="live-dot" aria-hidden="true"></span> VLM
            </button>
        );
    }

    return (
        <aside className="vlm-bar" aria-label="Page caption">
            <p className="sr-only" aria-live="polite">{text}</p>
            <div className="flex items-center justify-between gap-3 font-mono text-[10px] text-label">
                <span className="flex items-center gap-2 text-blueink">
                    <span className="live-dot" aria-hidden="true"></span>
                    VLM · {section.toUpperCase()}
                </span>
                <span className="flex items-center gap-3">
                    {latency} s
                    <button onClick={() => setOpen(false)} className="text-label hover:text-ink" aria-label="Hide VLM caption">
                        ✕
                    </button>
                </span>
            </div>
            <p className="mt-2 font-mono text-[12px] leading-[1.6] text-ink" aria-hidden="true">
                {shown}
                <span className="vlm-caret" aria-hidden="true"></span>
            </p>
        </aside>
    );
};

export default VlmCaption;
