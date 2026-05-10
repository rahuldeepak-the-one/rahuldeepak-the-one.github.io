import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "Languages",
        skills: ["C++", "Python", "C", "JavaScript", "Bash", "SQL"],
        delay: 0
    },
    {
        title: "AI & Computer Vision",
        skills: ["DeepStream", "TensorRT", "Triton", "CUDA", "PyTorch", "TensorFlow", "ONNX", "YOLO", "GStreamer"],
        delay: 0.15
    },
    {
        title: "Systems & DevOps",
        skills: ["Docker", "Kubernetes", "Linux", "CI/CD", "Kafka", "GPU Programming", "Meson", "Git", "Nginx"],
        delay: 0.3
    },
    {
        title: "Web & Full Stack",
        skills: ["React", "Vite", "Node.js", "PostgreSQL", "WebSocket", "REST APIs"],
        delay: 0.45
    }
];

const Skills = () => {
    return (
        <div className="space-y-12">
            {skillCategories.map((category, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: category.delay }}
                >
                    <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-[var(--color-orange)] pl-3">
                        {category.title}
                    </h3>

                    <div className="flex flex-wrap gap-4">
                        {category.skills.map((skill) => (
                            <motion.div
                                key={skill}
                                whileHover={{ scale: 1.05 }}
                                className="nvidia-glow bg-slate-800/80 px-4 py-2 rounded text-slate-300 font-mono text-sm border border-slate-700 hover:text-white hover:border-[var(--color-orange)] transition-colors cursor-default"
                            >
                                {skill}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Skills;
