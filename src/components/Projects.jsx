import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
    {
        title: "Iris Pipeline Modernization",
        category: "Edge AI / Architecture",
        description: "Decomposed a 3600-line C++ monolith into a modular plugin architecture with Triton-based inference, reducing container size by 30%.",
        tech: ["C++17", "Triton", "DeepStream 9.0", "Meson", "GStreamer"],
        stats: "Monolith → Modular Plugins",
        color: "border-purple-500/50 hover:border-purple-500",
        glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
    },
    {
        title: "DeepStream Benchmark Framework",
        category: "Performance Engineering",
        description: "Automated throughput/latency benchmarking for YOLO model families on NVIDIA edge hardware with data-driven reporting.",
        tech: ["DeepStream", "TensorRT", "YOLOv8", "YOLO26", "Python"],
        stats: "142 FPS on RTX 3060 (YOLOv8n)",
        color: "border-cyan-500/50 hover:border-cyan-500",
        glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
    },
    {
        title: "Semi-Supervised Skin Lesion Classification",
        category: "AI/ML",
        description: "MixMatch-based semi-supervised learning with ResNet-50 for 7-class skin cancer classification on 10,000 dermatoscopic images.",
        tech: ["PyTorch", "ResNet-50", "MixMatch", "Python"],
        stats: "69% Accuracy · F1 0.65",
        color: "border-blue-500/50 hover:border-blue-500",
        glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
    },
    {
        title: "XV6Plus OS",
        category: "Systems Engineering",
        description: "Extended MIT's XV6 kernel in C with virtual memory + demand paging, POSIX-compliant threads with context switching, and semaphore/mutex-based synchronisation.",
        tech: ["C", "Assembly", "Virtual Memory", "POSIX Threads"],
        stats: "Kernel extensions for VM, threads, sync",
        color: "border-[var(--color-orange)]/50 hover:border-[var(--color-orange)]",
        glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]"
    },
    {
        title: "Fast Chat",
        category: "Full Stack Software",
        description: "Real-time group messaging with image sharing over Python sockets, PostgreSQL-backed history, server-side load balancing, and end-to-end encryption.",
        tech: ["Python", "PostgreSQL", "Sockets", "Load Balancing"],
        stats: "Group chat with E2E auth + load balancing",
        color: "border-emerald-500/50 hover:border-emerald-500",
        glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
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
                    transition={{ delay: index * 0.15 }}
                    className={`group relative p-6 bg-slate-800/50 backdrop-blur-sm border rounded-lg transition-all duration-300 ${project.color} ${project.glow}`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-mono px-2 py-1 bg-slate-900 rounded text-slate-400 border border-slate-700">
                            {project.category}
                        </span>
                        <div className="flex space-x-3 text-slate-400">
                            <FaGithub className="hover:text-white cursor-pointer transition-colors" />
                            <FaExternalLinkAlt className="hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-orange)] transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="mb-6">
                        <span className="text-sm font-bold text-white block mb-1 bg-slate-900/50 p-2 rounded border-l-2 border-[var(--color-orange)]">
                            🚀 {project.stats}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((t) => (
                            <span key={t} className="text-xs text-slate-500 font-mono">
                                #{t}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Projects;
