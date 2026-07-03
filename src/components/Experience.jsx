import { motion } from "framer-motion";

const experiences = [
    {
        company: "Avathon",
        role: "Software Development Engineer",
        duration: "Jul 2025 – Present",
        location: "Bengaluru, India",
        description: "Owning the ground-up rewrite of IRIS, Avathon's production video-analytics platform, on DeepStream 6.2 → 9.0 with vLLM-based VSS integration.",
        highlights: [
            "<span class='text-[var(--color-orange)] font-bold'>Owning rewrite</span> of the IRIS pipeline (DeepStream 6.2 → 9.0) — C++/GStreamer core, dynamic bundler, MQTT cloud integration, and use-case modules (door, svm-cv, hse-cv) deployed across 10+ edge sites.",
            "Architected <span class='text-[var(--color-orange)] font-bold'>VSS (Video Summarization Service)</span> integrating vLLM-served VLMs and LLMs via Kafka for real-time scene understanding with configurable summarisation prompts.",
            "Diagnosed and fixed cross-version <span class='text-[var(--color-orange)] font-bold'>memory leaks across DS6.2 and DS8</span> (GLib vs raw-malloc <code>classifier_type</code> regression; <code>opTensorFilePath</code> leak).",
            "Decoupled TensorRT engine <span class='text-[var(--color-orange)] font-bold'>batch-size from camera count</span>, eliminating full engine rebuilds on fleet changes.",
            "Achieved <span class='text-[var(--color-orange)] font-bold'>40% inference speedup</span> via TensorRT FP16/INT8, batched preprocessing, and zero-copy NvBufSurface buffers; authored C++ plugins for NV12 → BGR and per-frame metadata.",
            "Built automated <span class='text-[var(--color-orange)] font-bold'>DS9 + Triton benchmark harness</span> (pyservicemaker, pynvml) reporting FPS/latency/GPU-memory across YOLOv8 and YOLO26 on RTX 3060.",
            "Hardened reliability: exponential-backoff retry replacing blocking loops, boundary-safe OpenCV preventing <code>cv::Rect</code> crashes, PTS-vs-wall-clock fix in frame sampling."
        ],
        tech: ["C++", "DeepStream 6.2→9.0", "TensorRT", "Triton", "vLLM", "GStreamer", "CUDA", "Kafka", "Python", "Docker"]
    },
    {
        company: "Hilti Technology Solutions",
        role: "Software Developer Intern",
        duration: "May 2024 – Jul 2024",
        location: "Pune, India",
        description: "Automated MSI release engineering and built regression-test infrastructure for enterprise web applications.",
        highlights: [
            "Built a <span class='text-[var(--color-orange)] font-bold'>CI/CD pipeline (GitLab CI + Docker + WiX Toolset)</span> for MSI installer creation, reducing deployment time from 2 hours to 10 minutes.",
            "Developed <span class='text-[var(--color-orange)] font-bold'>Selenium WebDriver</span> automated test scripts in C# with the Page Object Model pattern for the Firestop Solutions web app."
        ],
        tech: ["GitLab CI", "Docker", "WiX Toolset", "Selenium", "C#", "Bash"]
    }
];

const Experience = () => {
    return (
        <div className="space-y-12">
            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-8 border-l-2 border-slate-700/50 hover:border-[var(--color-orange)] transition-colors group"
                >
                    {/* Timeline Dot */}
                    <div className="absolute top-0 -left-[9px] w-4 h-4 bg-slate-900 border-2 border-slate-500 rounded-full group-hover:border-[var(--color-orange)] group-hover:shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all"></div>

                    <div className="mb-2">
                        <h3 className="font-display text-2xl font-bold text-white group-hover:text-[var(--color-orange)] transition-colors">
                            {exp.company}
                        </h3>
                        <div className="text-slate-400 flex flex-wrap items-center gap-2 text-sm mt-1">
                            <span>{exp.role}</span>
                            <span>•</span>
                            <span className="font-mono text-xs border border-slate-700 px-2 py-0.5 rounded">
                                {exp.duration}
                            </span>
                            {exp.location && (
                                <>
                                    <span>•</span>
                                    <span className="text-slate-500">{exp.location}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <p className="text-slate-300 mb-4">{exp.description}</p>

                    <ul className="space-y-2 mb-6">
                        {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start text-slate-300 text-sm leading-relaxed">
                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-[var(--color-orange)] rounded-full shrink-0"></span>
                                <span dangerouslySetInnerHTML={{ __html: highlight }}></span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs font-mono text-slate-400 bg-[var(--color-panel)] px-2 py-1 rounded border border-[var(--color-edge)]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Experience;
