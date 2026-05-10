import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendar, FaClock, FaTag, FaLink, FaArrowLeft } from "react-icons/fa";
import blogPosts from "../data/blogData";

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [linkCopied, setLinkCopied] = useState(false);
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-6xl mb-4">🔍</p>
                    <h1 className="text-2xl font-bold text-white mb-4 font-mono">
                        <span className="text-[var(--color-orange)]">$</span> cat ~/blog/{slug}
                    </h1>
                    <p className="text-slate-400 text-lg mb-2 font-mono">
                        bash: No such file or directory
                    </p>
                    <Link to="/blog" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-slate-800 border border-[var(--color-orange)] text-[var(--color-orange)] font-bold rounded hover:bg-[var(--color-orange)] hover:text-white transition-all duration-300">
                        <FaArrowLeft /> Back to blog
                    </Link>
                </div>
            </div>
        );
    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="flex items-center gap-2 mb-8">
                        <button onClick={() => navigate("/blog")} className="inline-flex items-center gap-2 text-slate-400 hover:text-[var(--color-orange)] transition-colors text-sm">
                            <FaArrowLeft size={12} /> cd ~/blog
                        </button>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-t-lg px-4 py-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-slate-500 text-xs ml-2 font-mono">rahul@dev:~/blog/{slug}</span>
                    </div>

                    <div className="bg-slate-800/30 border-x border-b border-slate-700 p-6 md:p-8 mb-8 rounded-b-lg">
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-slate-500 font-mono">
                            <span className="flex items-center gap-1"><FaCalendar size={10} />{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                            <span className="flex items-center gap-1"><FaClock size={10} />{post.readTime}</span>
                            <button onClick={copyLink} className="flex items-center gap-1 hover:text-[var(--color-orange)] transition-colors"><FaLink size={10} />{linkCopied ? "Copied!" : "Share"}</button>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span key={tag} className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded bg-slate-900/50 border border-slate-700/30 text-slate-400"><FaTag size={8} />{tag}</span>
                            ))}
                        </div>
                    </div>

                    <article className="blog-content text-slate-300 leading-relaxed">
                        {renderContent(post.content)}
                    </article>

                    <div className="mt-16 pt-8 border-t border-slate-700/50">
                        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-[var(--color-orange)] text-[var(--color-orange)] font-bold rounded hover:bg-[var(--color-orange)] hover:text-white transition-all duration-300">
                            <FaArrowLeft /> Back to all posts
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

function renderContent(content) {
    const lines = content.trim().split("\n");
    const elements = [];
    let inCode = false, codeLines = [], key = 0, inTable = false, tRows = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith("```")) {
            if (inCode) {
                elements.push(<pre key={key++} className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto my-6 text-sm font-mono text-slate-300"><code>{codeLines.join("\n")}</code></pre>);
                codeLines = []; inCode = false;
            } else { inCode = true; }
            continue;
        }
        if (inCode) { codeLines.push(line); continue; }

        if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
            if (!inTable) inTable = true;
            if (line.includes("---")) continue;
            tRows.push(line.split("|").filter(c => c.trim()).map(c => c.trim()));
            continue;
        } else if (inTable) {
            elements.push(
                <div key={key++} className="overflow-x-auto my-6"><table className="w-full text-sm border-collapse"><thead><tr className="border-b border-slate-700">{tRows[0]?.map((c, ci) => <th key={ci} className="text-left py-2 px-3 text-[var(--color-orange)] font-bold">{c}</th>)}</tr></thead><tbody>{tRows.slice(1).map((r, ri) => <tr key={ri} className="border-b border-slate-800 hover:bg-slate-800/30">{r.map((c, ci) => <td key={ci} className="py-2 px-3 text-slate-300">{c}</td>)}</tr>)}</tbody></table></div>
            );
            tRows = []; inTable = false;
        }

        if (line.startsWith("## ")) {
            elements.push(<h2 key={key++} className="text-2xl font-bold text-white mt-10 mb-4 border-l-4 border-[var(--color-orange)] pl-3">{line.slice(3)}</h2>);
        } else if (line.startsWith("### ")) {
            elements.push(<h3 key={key++} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(4)}</h3>);
        } else if (/^\d+\.\s/.test(line.trim())) {
            const c = line.replace(/^\d+\.\s/, "");
            elements.push(<div key={key++} className="flex items-start gap-3 mb-2 ml-4"><span className="text-[var(--color-orange)] font-bold mt-0.5 shrink-0">{line.match(/^\d+/)[0]}.</span><span dangerouslySetInnerHTML={{ __html: c.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} /></div>);
        } else if (line.trim().startsWith("- ")) {
            const c = line.trim().slice(2);
            elements.push(<div key={key++} className="flex items-start gap-3 mb-2 ml-4"><span className="text-[var(--color-orange)] mt-1.5 shrink-0">•</span><span dangerouslySetInnerHTML={{ __html: c.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} /></div>);
        } else if (line.trim()) {
            elements.push(<p key={key++} className="mb-4 text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: line.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-[var(--color-orange)] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />);
        }
    }

    if (inTable && tRows.length > 0) {
        elements.push(
            <div key={key++} className="overflow-x-auto my-6"><table className="w-full text-sm border-collapse"><thead><tr className="border-b border-slate-700">{tRows[0]?.map((c, ci) => <th key={ci} className="text-left py-2 px-3 text-[var(--color-orange)] font-bold">{c}</th>)}</tr></thead><tbody>{tRows.slice(1).map((r, ri) => <tr key={ri} className="border-b border-slate-800 hover:bg-slate-800/30">{r.map((c, ci) => <td key={ci} className="py-2 px-3 text-slate-300">{c}</td>)}</tr>)}</tbody></table></div>
        );
    }
    return elements;
}

export default BlogPost;
