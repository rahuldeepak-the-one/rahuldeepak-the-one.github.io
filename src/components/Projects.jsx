import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";

const projects = [
    {
        title: "Iris Pipeline Modernization",
        category: "Edge AI / Architecture",
        description: "Decomposed a 3600-line C++ monolith into a modular plugin architecture with Triton-based inference, reducing container size by 30%.",
        tech: ["C++17", "Triton", "DeepStream 9.0", "Meson", "GStreamer"],
        stats: "Monolith → Modular Plugins"
    },
    {
        title: "DeepStream Benchmark Framework",
        category: "Performance Engineering",
        description: "Automated throughput/latency benchmarking for YOLO model families on NVIDIA edge hardware with data-driven reporting.",
        tech: ["DeepStream", "TensorRT", "YOLOv8", "YOLO26", "Python"],
        stats: "142 FPS on RTX 3060 (YOLOv8n)"
    },
    {
        title: "Semi-Supervised Skin Lesion Classification",
        category: "AI/ML",
        description: "MixMatch-based semi-supervised learning with ResNet-50 for 7-class skin cancer classification on 10,000 dermatoscopic images.",
        tech: ["PyTorch", "ResNet-50", "MixMatch", "Python"],
        stats: "69% Accuracy · F1 0.65"
    },
    {
        title: "XV6Plus OS",
        category: "Systems Engineering",
        description: "Extended MIT's XV6 kernel in C with virtual memory + demand paging, POSIX-compliant threads with context switching, and semaphore/mutex-based synchronisation.",
        tech: ["C", "Assembly", "Virtual Memory", "POSIX Threads"],
        stats: "Kernel extensions for VM, threads, sync"
    },
    {
        title: "Fast Chat",
        category: "Full Stack Software",
        description: "Real-time group messaging with image sharing over Python sockets, PostgreSQL-backed history, server-side load balancing, and end-to-end encryption.",
        tech: ["Python", "PostgreSQL", "Sockets", "Load Balancing"],
        stats: "Group chat with E2E auth + load balancing"
    }
];

const Projects = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative flex flex-col p-6 bg-[var(--color-panel)]/50 backdrop-blur-sm border border-[var(--color-edge)] rounded-lg transition-all duration-300 hover:border-[var(--color-orange)] hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                >
                    <span className="self-start text-xs font-mono px-2 py-1 mb-4 bg-[var(--color-void)] rounded text-[var(--color-dim)] border border-[var(--color-edge)]">
                        {project.category}
                    </span>

                    <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[var(--color-orange)] transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-[var(--color-dim)] text-sm mb-4 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="mt-auto">
                        <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-signal)] mb-4 bg-[var(--color-void)]/60 p-2 rounded border-l-2 border-[var(--color-orange)]">
                            <FaChartLine className="shrink-0 text-[var(--color-orange)]" aria-hidden="true" />
                            {project.stats}
                        </div>

                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {project.tech.map((t) => (
                                <span key={t} className="text-xs text-slate-500 font-mono">
                                    #{t}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Projects;
