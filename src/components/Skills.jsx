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
                    <h3 className="font-display text-xl font-bold text-white mb-6 border-l-4 border-[var(--color-orange)] pl-3">
                        {category.title}
                    </h3>

                    <ul className="flex flex-wrap gap-3 list-none">
                        {category.skills.map((skill) => (
                            <li
                                key={skill}
                                className="bg-[var(--color-panel)]/70 px-4 py-2 rounded text-slate-300 font-mono text-sm border border-[var(--color-edge)]"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    );
};

export default Skills;
