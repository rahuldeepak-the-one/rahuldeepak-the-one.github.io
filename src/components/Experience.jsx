import { motion } from "framer-motion";

const experiences = [
    {
        company: "Avathon",
        role: "Software Development Engineer",
        duration: "Present",
        description: "Optimizing AI inference pipelines for large-scale computer vision systems.",
        highlights: [
            "Achieved <span class='text-[var(--color-orange)] font-bold'>40% inference speedup</span> using NVIDIA DeepStream, TensorRT, and custom C++ plugins.",
            "Engineered low-latency video processing pipelines for real-time analytics.",
            "Integrated multi-stream decoding and inference on edge devices."
        ],
        tech: ["C++", "DeepStream", "TensorRT", "CUDA", "Python"]
    },
    {
        company: "Hilti",
        role: "Software Intern",
        duration: "Past",
        description: "Streamlined deployment workflows and enhanced developer productivity.",
        highlights: [
            "Architected a CI/CD pipeline that reduced deployment time from <span class='text-[var(--color-orange)] font-bold'>2 hours to 10 minutes (91% reduction)</span>.",
            "Automated testing and release processes for microservices.",
            "Collaborated with cross-functional teams to improve system reliability."
        ],
        tech: ["CI/CD", "Docker", "Kubernetes", "Bash", "Linux"]
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
                        <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-orange)] transition-colors">
                            {exp.company}
                        </h3>
                        <div className="text-slate-400 flex flex-wrap items-center gap-2 text-sm mt-1">
                            <span>{exp.role}</span>
                            <span>•</span>
                            <span className="font-mono text-xs border border-slate-700 px-2 py-0.5 rounded">
                                {exp.duration}
                            </span>
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
                                className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700/50"
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
