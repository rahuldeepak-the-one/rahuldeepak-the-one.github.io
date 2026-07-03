import { useEffect, useRef } from "react";

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        // Create floating code particles
        const codeChars = ["0", "1", "{", "}", "<", ">", "/", "*", "#", "$", "=", "+", "→", "⟨", "⟩", "λ", "∞", "∑"];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                char: codeChars[Math.floor(Math.random() * codeChars.length)],
                size: Math.random() * 14 + 8,
                speed: Math.random() * 0.3 + 0.1,
                opacity: Math.random() * 0.15 + 0.02,
                drift: (Math.random() - 0.5) * 0.3,
            });
        }

        const drawFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                ctx.font = `${p.size}px "Ubuntu Sans Mono", monospace`;
                ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
                ctx.fillText(p.char, p.x, p.y);
            });
        };

        const animate = () => {
            drawFrame();

            particles.forEach((p) => {
                p.y -= p.speed;
                p.x += p.drift;

                if (p.y < -20) {
                    p.y = canvas.height + 20;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -20) p.x = canvas.width + 20;
                if (p.x > canvas.width + 20) p.x = -20;
            });

            animationId = requestAnimationFrame(animate);
        };

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            drawFrame();
        } else {
            animate();
        }

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

export default ParticleBackground;
