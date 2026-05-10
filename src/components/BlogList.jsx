import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendar, FaClock, FaTag, FaArrowRight } from "react-icons/fa";
import blogPosts from "../data/blogData";

const BlogList = () => {
    const [activeTag, setActiveTag] = useState("All");

    const allTags = useMemo(() => {
        const tags = new Set();
        blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
        return ["All", ...Array.from(tags).sort()];
    }, []);

    const filteredPosts = useMemo(() => {
        if (activeTag === "All") return blogPosts;
        return blogPosts.filter((post) => post.tags.includes(activeTag));
    }, [activeTag]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Terminal Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Back to home */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-[var(--color-orange)] transition-colors mb-8 text-sm"
                    >
                        <span>←</span> cd ~/home
                    </Link>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-12">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-slate-500 text-xs ml-2 font-mono">rahul@dev:~/blog</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            <span className="text-[var(--color-orange)]">$</span> cat ~/blog/index
                        </h1>
                        <p className="text-slate-400 mt-3 text-lg">
                            Thoughts on edge AI, systems engineering, and building things that scale.
                        </p>
                    </div>
                </motion.div>

                {/* Tag Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-10"
                >
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${
                                activeTag === tag
                                    ? "bg-[var(--color-orange)] text-white border-[var(--color-orange)] shadow-lg shadow-orange-500/20"
                                    : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-[var(--color-orange)] hover:text-white"
                            }`}
                        >
                            <FaTag className="inline mr-1" size={10} />
                            {tag}
                        </button>
                    ))}
                </motion.div>

                {/* Post Grid */}
                <div className="space-y-6">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index + 0.3 }}
                        >
                            <Link to={`/blog/${post.slug}`} className="block group">
                                <article className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 md:p-8 hover:border-[var(--color-orange)]/50 hover:bg-slate-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5">
                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-slate-500 font-mono">
                                        <span className="flex items-center gap-1">
                                            <FaCalendar size={10} />
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaClock size={10} />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--color-orange)] transition-colors mb-3">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-slate-400 leading-relaxed mb-5">
                                        {post.excerpt}
                                    </p>

                                    {/* Bottom */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs font-mono text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700/30"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="flex items-center gap-2 text-sm text-[var(--color-orange)] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                            Read <FaArrowRight size={12} />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        <p className="text-lg font-mono">$ grep -r "{activeTag}" ~/blog/</p>
                        <p className="mt-2">No posts found with that tag.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
