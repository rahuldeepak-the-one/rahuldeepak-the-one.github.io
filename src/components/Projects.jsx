import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCodeBranch } from "react-icons/fa";

const projects = [
    {
        title: "Precancerous Lesion Detection",
        category: "AI/ML",
        description: "Deep learning model for early cancer detection using ResNet-50 architecture.",
        tech: ["PyTorch", "ResNet-50", "Computer Vision", "Python"],
        stats: "High Accuracy on Histopathology Data",
        color: "border-blue-500/50 hover:border-blue-500",
        glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
    },
    {
        title: "XV6Plus OS",
        category: "Systems Engineering",
        description: "Extended the XV6 operating system with advanced kernel features.",
        tech: ["C", "Assembly", "Virtual Memory", "POSIX Threads"],
        stats: "Implemented CoW & Priority Scheduling",
        color: "border-[var(--color-orange)]/50 hover:border-[var(--color-orange)]",
        glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]"
    },
    {
        title: "Fast Chat",
        category: "Full Stack Software",
        description: "Scalable real-time messaging application with load balancing.",
        tech: ["Python", "PostgreSQL", "WebSocket", "Nginx"],
        stats: "Handles 10k+ Concurrent Connections",
        color: "border-emerald-500/50 hover:border-emerald-500",
        glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
    }
];

const Projects = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
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
