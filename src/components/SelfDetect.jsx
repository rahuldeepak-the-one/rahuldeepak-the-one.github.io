import { useEffect, useRef, useState } from "react";

/**
 * The page runs a detector on itself. Hovering any element snaps a
 * detection box onto it (class · track id · confidence), and a VLM caption
 * bar narrates whichever section is on screen. Pure DOM — no model runs;
 * labels come from data-det attributes or the element's tag.
 */

const TAG_CLASS = {
    H1: "heading", H2: "heading", H3: "heading", H4: "heading",
    A: "link", BUTTON: "button", P: "text", LI: "list-item",
    ARTICLE: "card", IMG: "figure", SVG: "figure", DT: "label", DD: "value",
};
const PICKABLE = "[data-det],a,button,h1,h2,h3,h4,p,li,article,dt,dd,.chip";

const CAPTIONS = {
    hero: "a name in large type over drifting electrons; three buttons invite the viewer further in.",
    experience: "an engineer's current role: a video pipeline rebuilt on DeepStream 9, and a vision-language model checking what the cameras saw.",
    projects: "four project schematics: a local AI terminal, a live church translator, a skin-lesion classifier and a vehicle speed estimator.",
    skills: "two signal paths. frames flow through GStreamer into CUDA; verdicts flow out through vLLM.",
    education: "credentials: computer science at IIT Bombay, JEE ranks 709 and 157, a deep learning certificate.",
    notes: "a short register of field notes on DeepStream pipelines and edge-GPU benchmarks.",
    contact: "a title block awaiting approval. verdict: worth emailing. confidence 0.99.",
};

// stable pseudo-confidence per element, 0.86–0.99
const confidence = (text) => {
    let h = 0;
    for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
    return (0.86 + (Math.abs(h) % 14) / 100).toFixed(2);
};

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => window.matchMedia("(hover: hover)").matches;
const HOVER_HINT = " hint: hover anything — this page runs a detector on itself.";

const DetectionBox = () => {
    const [det, setDet] = useState(null);
    const target = useRef(null);
    const ids = useRef(new WeakMap());
    const nextId = useRef(1);

    useEffect(() => {
        // hover-capable pointers only; touch screens get the caption bar alone
        if (!canHover()) return undefined;

        const measure = () => {
            const el = target.current;
            if (!el || !el.isConnected) return setDet(null);
            const r = el.getBoundingClientRect();
            if (r.width < 4 || r.height < 4) return setDet(null);
            if (!ids.current.has(el)) ids.current.set(el, nextId.current++);
            const label = el.dataset.det || TAG_CLASS[el.tagName.toUpperCase()] || "chip";
            setDet({
                x: r.left - 4, y: r.top - 4, w: r.width + 8, h: r.height + 8,
                label, id: ids.current.get(el), conf: confidence(label + el.textContent),
            });
        };

        const onMove = (e) => {
            let hit = e.target instanceof Element ? e.target.closest(PICKABLE) : null;
            // the hero copy is pointer-transparent (the electron field owns the cursor), so hit-test it by rect
            if (!hit) {
                hit = [...document.querySelectorAll(`#hero :is(${PICKABLE})`)].find((el) => {
                    const r = el.getBoundingClientRect();
                    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
                }) || null;
            }
            // skip elements that fill most of the screen — boxes should feel like detections
            const big = hit && hit.getBoundingClientRect().height > window.innerHeight * 0.7;
            const el = big ? null : hit;
            if (el === target.current) return;
            target.current = el;
            measure();
        };
        let raf = null;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => { raf = null; measure(); });
        };
        const onLeave = () => { target.current = null; setDet(null); };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("scroll", onScroll);
            document.documentElement.removeEventListener("pointerleave", onLeave);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    if (!det) return null;
    const tagBelow = det.y < 20; // keep the label on screen near the top edge
    return (
        <div
            aria-hidden="true"
            className="det-box"
            style={{ transform: `translate(${det.x}px, ${det.y}px)`, width: det.w, height: det.h }}
        >
            <span className={`det-box__tag ${tagBelow ? "det-box__tag--below" : ""}`}>
                {det.label} #{det.id} {det.conf}
            </span>
        </div>
    );
};

const VlmCaption = () => {
    const [caption, setCaption] = useState({ section: "hero", latency: "0.41" });
    const [typed, setTyped] = useState(0);
    // on touch screens the bar would cover content, so it starts minimised
    const [open, setOpen] = useState(canHover);
    const { section, latency } = caption;
    const text = (CAPTIONS[section] || "") + (section === "hero" && canHover() ? HOVER_HINT : "");

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

const SelfDetect = () => (
    <>
        <DetectionBox />
        <VlmCaption />
    </>
);

export default SelfDetect;
