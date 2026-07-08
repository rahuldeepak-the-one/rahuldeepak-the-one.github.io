import { useEffect, useRef } from "react";

/**
 * Electron Field — signature interactive hero background, ported from the
 * design handoff's vanilla reference (electron-field.js).
 *
 * A faint procedural circuit board sits behind drifting electrons; carrier
 * electrons ride the traces, near electrons link up, the cursor acts as a
 * positron (gentle pull + a conduction path with a travelling charge), and
 * clicks fire ripple rings that shove electrons outward.
 *
 * Pointer events are attached to the PARENT element — the canvas must live
 * inside a position:relative hero whose text layer is pointer-events-none.
 * Under prefers-reduced-motion the field renders one static circuit frame.
 * The rAF loop pauses while the hero is off-screen.
 */
function initElectronField(cv, opts = {}) {
    const ctx = cv.getContext("2d");
    const dotColor = opts.color || "#2f4fe0";
    const linkColor = opts.linkColor || "rgba(47,79,224,0.13)";
    const reduced = !!opts.reduced;
    const parent = cv.parentElement;
    let W = 0, H = 0;
    const resize = () => { W = cv.width = parent.clientWidth; H = cv.height = parent.clientHeight; };
    resize();
    let regen = null;
    const ro = new ResizeObserver(() => { resize(); regen && regen(); });
    ro.observe(parent);

    const count = Math.min(80, Math.round((W * H) / 13000)) || 60;
    const ps = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
    }));

    // ---- circuit background ----
    const circuit = { paths: [], parts: [] };
    const genCircuit = () => {
        circuit.paths = []; circuit.parts = [];
        if (W < 100 || H < 100) return;
        for (let i = 0; i < 8; i++) {
            let x = 30 + Math.random() * (W - 60), y = 30 + Math.random() * (H - 60);
            const pts = [{ x, y }];
            let horiz = Math.random() < 0.5;
            const nSegs = 3 + Math.floor(Math.random() * 3);
            for (let s = 0; s < nSegs; s++) {
                const len = 70 + Math.random() * 170, dir = Math.random() < 0.5 ? -1 : 1;
                if (horiz) x = Math.max(24, Math.min(W - 24, x + dir * len));
                else y = Math.max(24, Math.min(H - 24, y + dir * len));
                pts.push({ x, y }); horiz = !horiz;
            }
            const segs = []; let total = 0;
            for (let k = 1; k < pts.length; k++) { const L = Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y); segs.push(L); total += L; }
            circuit.paths.push({ pts, segs, total });
            const v = pts[1 + Math.floor(Math.random() * (pts.length - 2))];
            circuit.parts.push({ x: v.x, y: v.y });
        }
    };
    const bgCv = document.createElement("canvas");
    const drawBg = () => {
        bgCv.width = Math.max(1, W); bgCv.height = Math.max(1, H);
        const b = bgCv.getContext("2d");
        b.strokeStyle = dotColor; b.lineWidth = 1;
        for (const path of circuit.paths) {
            const pts = path.pts;
            b.globalAlpha = 0.12;
            b.beginPath(); b.moveTo(pts[0].x, pts[0].y);
            for (let k = 1; k < pts.length; k++) b.lineTo(pts[k].x, pts[k].y);
            b.stroke();
            b.globalAlpha = 0.18;
            for (const e of [pts[0], pts[pts.length - 1]]) b.strokeRect(e.x - 3, e.y - 3, 6, 6);
        }
        for (const t of circuit.parts) {
            b.globalAlpha = 0.2;
            b.beginPath(); b.arc(t.x, t.y, 9, 0, 6.2832); b.stroke();
            b.beginPath();
            b.moveTo(t.x - 9, t.y); b.lineTo(t.x - 16, t.y);
            b.moveTo(t.x + 6, t.y - 6); b.lineTo(t.x + 13, t.y - 12);
            b.moveTo(t.x + 6, t.y + 6); b.lineTo(t.x + 13, t.y + 12);
            b.stroke();
        }
        b.globalAlpha = 1;
    };
    const pointAt = (path, s) => {
        s = ((s % path.total) + path.total) % path.total;
        const pts = path.pts;
        for (let k = 0; k < path.segs.length; k++) {
            if (s <= path.segs[k] || k === path.segs.length - 1) {
                const f = path.segs[k] > 0 ? Math.min(1, s / path.segs[k]) : 0;
                return { x: pts[k].x + (pts[k + 1].x - pts[k].x) * f, y: pts[k].y + (pts[k + 1].y - pts[k].y) * f };
            }
            s -= path.segs[k];
        }
        return pts[0];
    };
    const assignCarriers = () => {
        ps.forEach((p, i) => {
            if (i < 10 && circuit.paths.length) {
                p.carrier = true; p.pathIdx = i % circuit.paths.length;
                if (p.s === undefined) p.s = Math.random() * circuit.paths[p.pathIdx].total;
            } else p.carrier = false;
        });
    };
    const drawStatic = () => {
        ctx.clearRect(0, 0, W, H);
        if (bgCv.width > 1) ctx.drawImage(bgCv, 0, 0);
        ctx.globalAlpha = 1; ctx.fillStyle = dotColor;
        for (const p of ps) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.7, 0, 6.2832); ctx.fill(); }
    };
    let seeded = false;
    regen = () => {
        genCircuit(); drawBg(); assignCarriers();
        if (!seeded && W > 100 && H > 100) {
            seeded = true;
            for (const p of ps) { p.x = Math.random() * W; p.y = Math.random() * H; }
        }
        if (reduced) drawStatic();
    };
    regen();

    // Reduced motion: one static circuit frame, no listeners, no rAF loop.
    if (reduced) {
        return () => ro.disconnect();
    }

    // ---- pointer state ----
    let mouse = null;
    const ripples = [];
    const pulse = { t: 0, dir: 1 };
    const onMove = (e) => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouse = null; };
    const onDown = (e) => {
        const r = cv.getBoundingClientRect();
        const cx = e.clientX - r.left, cy = e.clientY - r.top;
        ripples.push({ x: cx, y: cy, r: 0 });
        if (ripples.length > 6) ripples.shift();
        for (const p of ps) {
            const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy);
            if (d < 150 && d > 0.01) { const f = ((150 - d) / 150) * 7; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        }
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    parent.addEventListener("pointerdown", onDown);

    // ---- main loop (paused while the hero is off-screen) ----
    let raf = null;
    let visible = true;
    const step = () => {
        raf = null;
        if (!visible) return;
        ctx.clearRect(0, 0, W, H);
        if (bgCv.width > 1) ctx.drawImage(bgCv, 0, 0);
        for (const p of ps) {
            if (p.carrier && circuit.paths[p.pathIdx]) {
                p.s += 0.9;
                const pt = pointAt(circuit.paths[p.pathIdx], p.s);
                p.x = pt.x; p.y = pt.y;
                continue;
            }
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
            if (mouse) {
                const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
                if (d > 60 && d < 240) { const f = 0.03 * (1 - d / 240); p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
            }
            for (const rp of ripples) {
                const dx = p.x - rp.x, dy = p.y - rp.y, d = Math.hypot(dx, dy);
                const band = Math.abs(d - rp.r);
                if (band < 40 && d > 0.01) { const f = ((40 - band) / 40) * 2.6; p.vx += (dx / d) * f * 0.35; p.vy += (dy / d) * f * 0.35; }
            }
            p.vx *= 0.985; p.vy *= 0.985;
            const sp = Math.hypot(p.vx, p.vy);
            if (sp < 0.12) { p.vx += (Math.random() - 0.5) * 0.1; p.vy += (Math.random() - 0.5) * 0.1; }
            if (sp > 3) { p.vx *= 0.9; p.vy *= 0.9; }
        }
        // ripple rings
        for (let i = ripples.length - 1; i >= 0; i--) {
            const rp = ripples[i]; rp.r += 4.5;
            const alpha = Math.max(0, 1 - rp.r / 420);
            if (alpha <= 0) { ripples.splice(i, 1); continue; }
            ctx.strokeStyle = dotColor; ctx.lineWidth = 1.5;
            ctx.globalAlpha = alpha * 0.6;
            ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, 6.2832); ctx.stroke();
            ctx.globalAlpha = alpha * 0.25;
            ctx.beginPath(); ctx.arc(rp.x, rp.y, Math.max(0, rp.r - 14), 0, 6.2832); ctx.stroke();
        }
        ctx.globalAlpha = 1; ctx.lineWidth = 1;
        // particle links
        for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
            const a = ps[i], b = ps[j], d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 110) {
                ctx.strokeStyle = linkColor; ctx.globalAlpha = 1 - d / 110;
                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
        }
        // conduction path + travelling charge
        if (mouse) {
            const near = [];
            for (const p of ps) { const d = Math.hypot(p.x - mouse.x, p.y - mouse.y); if (d < 230) near.push({ p, d }); }
            near.sort((a, b) => a.d - b.d);
            const chain = near.slice(0, 6).map((o) => o.p);
            if (chain.length > 1) {
                const pts = [{ x: mouse.x, y: mouse.y }].concat(chain);
                ctx.strokeStyle = dotColor; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.45;
                ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
                for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
                ctx.stroke();
                ctx.globalAlpha = 0.9; ctx.fillStyle = dotColor;
                for (let i = 1; i < pts.length; i++) { ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 2.4, 0, 6.2832); ctx.fill(); }
                const segs = []; let total = 0;
                for (let i = 1; i < pts.length; i++) { const L = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); segs.push(L); total += L; }
                pulse.t += 0.022 * pulse.dir;
                if (pulse.t >= 1) { pulse.t = 1; pulse.dir = -1; }
                if (pulse.t <= 0) { pulse.t = 0; pulse.dir = 1; }
                let dist = pulse.t * total, px = pts[0].x, py = pts[0].y;
                for (let i = 0; i < segs.length; i++) {
                    if (dist <= segs[i] || i === segs.length - 1) {
                        const k = segs[i] > 0 ? Math.min(1, dist / segs[i]) : 0;
                        px = pts[i].x + (pts[i + 1].x - pts[i].x) * k;
                        py = pts[i].y + (pts[i + 1].y - pts[i].y) * k;
                        break;
                    }
                    dist -= segs[i];
                }
                ctx.globalAlpha = 1;
                ctx.beginPath(); ctx.arc(px, py, 4, 0, 6.2832);
                ctx.fillStyle = dotColor; ctx.shadowColor = dotColor; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
                ctx.globalAlpha = 0.85;
                ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 3.2, 0, 6.2832);
                ctx.strokeStyle = dotColor; ctx.lineWidth = 1.5; ctx.stroke();
            }
        }
        ctx.globalAlpha = 1; ctx.fillStyle = dotColor;
        for (const p of ps) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.7, 0, 6.2832); ctx.fill(); }
        raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && raf === null) raf = requestAnimationFrame(step);
    });
    io.observe(parent);
    raf = requestAnimationFrame(step);

    return () => {
        if (raf !== null) cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        parent.removeEventListener("pointermove", onMove);
        parent.removeEventListener("pointerleave", onLeave);
        parent.removeEventListener("pointerdown", onDown);
    };
}

const ElectronField = ({ color = "#2f4fe0", linkColor = "rgba(47,79,224,0.13)" }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return undefined;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        return initElectronField(cv, { color, linkColor, reduced });
    }, [color, linkColor]);

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

export default ElectronField;
