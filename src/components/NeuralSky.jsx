import { useEffect, useRef } from "react";
import { skyWords } from "../data/skyThoughts";

const STAR = "233,234,240";
const LINK = "142,160,255";
const OFF = { x: -1e4, y: -1e4 };

// Seeded so the constellation is the same on every reload.
const seeded = (seed) => {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return s / 2147483647;
    };
};

/** Builds background stars, neuron nodes and edges for either layers or clusters mode. */
const buildField = (o) => {
    const rnd = seeded(o.seed || 7);
    const bg = Array.from({ length: o.bgN || 260 }, () => ({
        x: rnd(), y: rnd(), r: 0.4 + rnd() * 1.1, ph: rnd() * 6.28, sp: 0.4 + rnd() * 1.6,
    }));
    const nodes = [];
    const edges = [];
    const link = (a, b, both) => {
        edges.push([a, b]);
        a.out.push(b);
        if (both) b.out.push(a);
    };
    const mk = (x, y, cl) => {
        const n = { x, y, ph: rnd() * 6.28, glow: 0, out: [], cl };
        nodes.push(n);
        return n;
    };
    const nearest = (a, pool, k) =>
        pool.filter((b) => b !== a)
            .map((b) => [Math.hypot(a.x - b.x, a.y - b.y), b])
            .sort((p, q) => p[0] - q[0])
            .slice(0, k)
            .map(([, b]) => b);

    let starts;
    let hops;
    if (o.clusters) {
        const groups = o.clusters.map((c, ci) =>
            Array.from({ length: c.n }, () => {
                const an = rnd() * 6.28;
                const rr = (0.25 + rnd() * 0.75) * (c.r || 0.09);
                return mk(c.cx + Math.cos(an) * rr, c.cy + Math.sin(an) * rr * 1.6, ci);
            })
        );
        groups.forEach((g) => g.forEach((a) => nearest(a, g, 2).forEach((b) => !a.out.includes(b) && link(a, b, true))));
        groups.forEach((g, i) =>
            groups.slice(i + 1).forEach((g2) => {
                let best = null;
                g.forEach((a) => g2.forEach((b) => {
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (!best || d < best[0]) best = [d, a, b];
                }));
                if (best[0] < 0.42) link(best[1], best[2], true);
            })
        );
        hops = o.flow ? 14 : 7;
        starts = o.flow ? [...groups[0]].sort((p, q) => p.x - q.x).slice(0, 3) : nodes;
    } else {
        const counts = o.counts || [5, 7, 8, 9, 8, 6, 4];
        const { x0 = 0.46, x1 = 0.95, y0 = 0.12, y1 = 0.88 } = o;
        const layers = counts.map((n, i) =>
            Array.from({ length: n }, () =>
                mk(x0 + ((x1 - x0) * i) / (counts.length - 1) + (rnd() - 0.5) * 0.03, y0 + rnd() * (y1 - y0))
            )
        );
        layers.slice(0, -1).forEach((L, i) => L.forEach((a) => nearest(a, layers[i + 1], 3).forEach((b) => link(a, b))));
        starts = layers[0];
        hops = counts.length - 1;
    }
    return { bg, nodes, edges, starts, hops, rnd, sig: null, labels: [], next: 800, wi: 0, m: OFF };
};

const drawField = (cv, f, o, now, still) => {
    const dpr = window.devicePixelRatio || 1;
    const W = cv.clientWidth;
    const H = cv.clientHeight;
    if (!W) return;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
    }
    const c = cv.getContext("2d");
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    const T = still ? 0 : now / 1000;
    const dimNodes = o.nodeAlpha ?? 1;

    f.bg.forEach((b) => {
        c.fillStyle = `rgba(${STAR},${0.18 + 0.6 * (0.5 + 0.5 * Math.sin(T * b.sp + b.ph))})`;
        c.beginPath();
        c.arc(b.x * W, b.y * H, b.r, 0, 6.28);
        c.fill();
    });

    const mx = f.m.x * W;
    const my = f.m.y * H;
    const base = o.clusters ? 0.13 : 0.045;
    c.lineWidth = 1;
    f.edges.forEach(([a, b]) => {
        const near = Math.max(0, 1 - Math.hypot(((a.x + b.x) / 2) * W - mx, ((a.y + b.y) / 2) * H - my) / 170);
        c.strokeStyle = `rgba(${LINK},${base + near * 0.4})`;
        c.beginPath();
        c.moveTo(a.x * W, a.y * H);
        c.lineTo(b.x * W, b.y * H);
        c.stroke();
    });

    // start a new "thought": a random walk along the edges
    if (!still && now > f.next && !f.sig && (!o.hoverOnly || f.m.x > -1)) {
        let n = f.starts[Math.floor(f.rnd() * f.starts.length)];
        const path = [n];
        for (let i = 0; i < f.hops; i++) {
            const nx = n.out.filter((x) => !path.includes(x) && (!o.flow || x.x > n.x));
            if (!nx.length) break;
            n = nx[Math.floor(f.rnd() * nx.length)];
            path.push(n);
        }
        f.sig = { path, t0: now };
    }

    if (f.sig) {
        const p = (now - f.sig.t0) / (o.seg || 420);
        const k = Math.floor(p);
        const P = f.sig.path;
        c.strokeStyle = `rgba(${LINK},0.55)`;
        c.lineWidth = 1.2;
        c.beginPath();
        c.moveTo(P[0].x * W, P[0].y * H);
        for (let i = 1; i <= Math.min(k, P.length - 1); i++) {
            c.lineTo(P[i].x * W, P[i].y * H);
            P[i - 1].glow = 1;
        }
        if (k < P.length - 1) {
            const a = P[k];
            const b = P[k + 1];
            const fr = p - k;
            c.lineTo((a.x + (b.x - a.x) * fr) * W, (a.y + (b.y - a.y) * fr) * H);
        }
        c.stroke();
        if (k >= P.length - 1) {
            const end = P[P.length - 1];
            end.glow = 1;
            const pool = o.clusters ? o.clusters[end.cl].words : o.words || skyWords;
            const word = pool[f.wi++ % pool.length];
            if (!o.noLabels) f.labels.push({ text: word, x: end.x, y: end.y, born: now });
            o.onThought?.(word);
            f.sig = null;
            f.next = now + (o.gap || 1800) + f.rnd() * 1800;
        }
    }

    f.nodes.forEach((n) => {
        n.glow *= 0.985;
        const tw = 0.5 + 0.5 * Math.sin(T * 1.3 + n.ph);
        const near = Math.max(0, 1 - Math.hypot(n.x * W - mx, n.y * H - my) / 140);
        if (n.glow > 0.05) {
            c.fillStyle = `rgba(${LINK},${n.glow * 0.22})`;
            c.beginPath();
            c.arc(n.x * W, n.y * H, 9 * n.glow + 2, 0, 6.28);
            c.fill();
        }
        c.fillStyle = `rgba(${STAR},${Math.min(1, 0.45 + 0.4 * tw + near * 0.5 + n.glow * 0.5) * dimNodes})`;
        c.beginPath();
        c.arc(n.x * W, n.y * H, 1.7 + n.glow * 1.3 + near, 0, 6.28);
        c.fill();
    });

    f.labels = f.labels.filter((l) => now - l.born < 3200);
    c.font = "500 12px 'JetBrains Mono', monospace";
    c.fillStyle = "#ffffff";
    f.labels.forEach((l) => {
        const age = (now - l.born) / 3200;
        c.globalAlpha = Math.max(0, age < 0.15 ? age / 0.15 : 1 - (age - 0.15) / 0.85);
        c.textAlign = l.x > 0.5 ? "right" : "left";
        c.fillText(l.text, l.x * W + (l.x > 0.5 ? -12 : 12), l.y * H + 4);
    });
    c.globalAlpha = 1;
};

/**
 * Twinkling night sky whose stars are neurons; every few seconds a signal
 * walks across the network and lands on a word (reported via onThought).
 * Config is read once on mount.
 */
const NeuralSky = ({ onThought, className = "", ...config }) => {
    const canvasRef = useRef(null);
    const onThoughtRef = useRef(onThought);
    const configRef = useRef(config);

    useEffect(() => {
        onThoughtRef.current = onThought;
    }, [onThought]);

    useEffect(() => {
        const cv = canvasRef.current;
        const o = { ...configRef.current, onThought: (w) => onThoughtRef.current?.(w) };
        const f = buildField(o);
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const canHover = window.matchMedia("(hover: hover)").matches;
        let raf = 0;

        const frame = (now) => {
            drawField(cv, f, o, now, still);
            raf = requestAnimationFrame(frame);
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };
        const redrawStill = () => drawField(cv, f, o, 0, true);

        const io = new IntersectionObserver(([entry]) => {
            if (still) return redrawStill();
            if (entry.isIntersecting && !raf) raf = requestAnimationFrame(frame);
            else if (!entry.isIntersecting) stop();
        });
        io.observe(cv);

        const move = (ev) => {
            const r = cv.getBoundingClientRect();
            f.m = { x: (ev.clientX - r.left) / r.width, y: (ev.clientY - r.top) / r.height };
            if (still) redrawStill();
        };
        const leave = () => {
            f.m = OFF;
            if (still) redrawStill();
        };
        if (canHover) {
            cv.addEventListener("mousemove", move);
            cv.addEventListener("mouseleave", leave);
        }
        if (still) window.addEventListener("resize", redrawStill);

        return () => {
            stop();
            io.disconnect();
            cv.removeEventListener("mousemove", move);
            cv.removeEventListener("mouseleave", leave);
            window.removeEventListener("resize", redrawStill);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
};

export default NeuralSky;
