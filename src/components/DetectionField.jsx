import { useEffect, useRef } from "react";

/**
 * Detection Field — signature hero background. A faint 2×2 camera wall with
 * tracked objects drifting through it: bounding box, class label, track id,
 * confidence and a short trail, the way a video-analytics overlay draws them.
 * The cursor is tracked too ("visitor").
 *
 * Pointer events are attached to the PARENT element — the canvas must live
 * inside a position:relative hero whose text layer is pointer-events-none.
 * Under prefers-reduced-motion one static frame is drawn.
 * The rAF loop pauses while the hero is off-screen.
 */
const CLASSES = [
    { name: "person", w: 34, h: 82 },
    { name: "person", w: 30, h: 76 },
    { name: "car", w: 112, h: 52 },
    { name: "forklift", w: 74, h: 66 },
    { name: "helmet", w: 22, h: 18 },
    { name: "truck", w: 150, h: 70 },
];

function initDetectionField(cv, { color, reduced }) {
    const ctx = cv.getContext("2d");
    const parent = cv.parentElement;
    let W = 0, H = 0;
    const resize = () => { W = cv.width = parent.clientWidth; H = cv.height = parent.clientHeight; };
    resize();

    let nextId = 1;
    const spawn = (o, anywhere) => {
        const c = CLASSES[Math.floor(Math.random() * CLASSES.length)];
        const dir = Math.random() < 0.5 ? -1 : 1;
        o.cls = c.name; o.w = c.w; o.h = c.h;
        o.id = nextId++;
        o.vx = dir * (14 + Math.random() * 26);
        o.vy = (Math.random() - 0.5) * 6;
        o.x = anywhere ? Math.random() * W : dir > 0 ? -o.w : W;
        o.y = 40 + Math.random() * Math.max(1, H - 80 - o.h);
        o.conf = 0.82 + Math.random() * 0.17;
        o.trail = [];
        return o;
    };
    const count = W < 640 ? 4 : 7;
    const objs = Array.from({ length: count }, () => spawn({}, true));

    let mouse = null;
    let fps = 25;

    const label = (x, y, text, alpha) => {
        ctx.font = "500 10px 'JetBrains Mono', monospace";
        const tw = ctx.measureText(text).width + 8;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(x, y - 14, tw, 14);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(text, x + 4, y - 4);
    };

    const box = (x, y, w, h, text, alpha) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = alpha * 0.55;
        ctx.strokeRect(x, y, w, h);
        // heavier corner ticks
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 2;
        const k = Math.min(10, w / 3, h / 3);
        ctx.beginPath();
        ctx.moveTo(x, y + k); ctx.lineTo(x, y); ctx.lineTo(x + k, y);
        ctx.moveTo(x + w - k, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - k);
        ctx.stroke();
        label(x - 1, y, text, alpha * 0.85);
    };

    const drawFrame = () => {
        ctx.clearRect(0, 0, W, H);

        // camera wall: dashed 2×2 dividers + tile ids
        ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.globalAlpha = 0.08;
        ctx.setLineDash([4, 6]);
        ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = "500 10px 'JetBrains Mono', monospace";
        ctx.fillStyle = color; ctx.globalAlpha = 0.28;
        ["CAM 01", "CAM 02", "CAM 03", "CAM 04"].forEach((t, i) => {
            ctx.fillText(t, (i % 2) * (W / 2) + 12, Math.floor(i / 2) * (H / 2) + 20);
        });

        for (const o of objs) {
            ctx.fillStyle = color;
            o.trail.forEach((p, i) => {
                ctx.globalAlpha = (i / o.trail.length) * 0.25;
                ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
            });
            // stay quiet behind the hero copy (left side on desktop, everywhere on mobile)
            const behindText = W < 900 || o.x + o.w / 2 < W * 0.6;
            box(o.x, o.y, o.w, o.h, `${o.cls} #${o.id} ${o.conf.toFixed(2)}`, behindText ? 0.16 : 0.5);
        }

        if (mouse) box(mouse.x - 32, mouse.y - 40, 64, 80, "visitor #00 0.99", 0.9);

        // telemetry readout, bottom-right
        const hud = `${objs.length + (mouse ? 1 : 0)} TRACKS · ${fps.toFixed(1)} FPS · 4.7 MS/FRAME`;
        ctx.font = "500 10px 'JetBrains Mono', monospace";
        ctx.globalAlpha = 0.45; ctx.fillStyle = color;
        ctx.fillText(hud, W - ctx.measureText(hud).width - 16, H - 14);
        ctx.globalAlpha = 1;
    };

    const ro = new ResizeObserver(() => { resize(); drawFrame(); });
    ro.observe(parent);

    if (reduced) {
        drawFrame();
        return () => ro.disconnect();
    }

    const onMove = (e) => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouse = null; };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);

    let raf = null;
    let visible = true;
    let last = performance.now();
    let trailTick = 0;
    const step = (now) => {
        raf = null;
        if (!visible) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        fps += ((1 / Math.max(dt, 0.001)) - fps) * 0.05;
        fps = Math.min(fps, 60);
        trailTick += dt;
        const pushTrail = trailTick > 0.12;
        if (pushTrail) trailTick = 0;

        for (const o of objs) {
            o.x += o.vx * dt;
            o.y += o.vy * dt;
            if (o.y < 30 || o.y + o.h > H - 30) o.vy *= -1;
            o.conf = Math.min(0.99, Math.max(0.78, o.conf + (Math.random() - 0.5) * 0.01));
            if (pushTrail) {
                o.trail.push({ x: o.x + o.w / 2, y: o.y + o.h });
                if (o.trail.length > 18) o.trail.shift();
            }
            if (o.x > W + 20 || o.x + o.w < -20) spawn(o, false);
        }
        drawFrame();
        raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && raf === null) { last = performance.now(); raf = requestAnimationFrame(step); }
    });
    io.observe(parent);
    raf = requestAnimationFrame(step);

    return () => {
        if (raf !== null) cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        parent.removeEventListener("pointermove", onMove);
        parent.removeEventListener("pointerleave", onLeave);
    };
}

const DetectionField = ({ color = "#2f4fe0" }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return undefined;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        return initDetectionField(cv, { color, reduced });
    }, [color]);

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

export default DetectionField;
