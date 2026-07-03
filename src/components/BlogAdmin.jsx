import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTrash, FaEdit, FaSave, FaLock, FaEye } from "react-icons/fa";

const ADMIN_PASSWORD = import.meta.env.VITE_BLOG_ADMIN_PASSWORD || "";
const STORAGE_KEY = "blog_admin_posts";

const BlogAdmin = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [editing, setEditing] = useState(null);

    const emptyPost = { slug: "", title: "", date: new Date().toISOString().split("T")[0], tags: "", excerpt: "", readTime: "5 min", content: "" };

    const savePosts = (updated) => {
        setPosts(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!ADMIN_PASSWORD) {
            setError("Admin is disabled in this build. Set VITE_BLOG_ADMIN_PASSWORD locally to use it.");
            return;
        }
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            setError("");
        } else {
            setError("Access denied. Invalid credentials.");
        }
    };

    const addPost = () => {
        setEditing({ ...emptyPost, isNew: true });
    };

    const savePost = () => {
        if (!editing.title || !editing.content) return;
        const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const post = { ...editing, slug, tags: typeof editing.tags === "string" ? editing.tags.split(",").map(t => t.trim()).filter(Boolean) : editing.tags };
        delete post.isNew;

        if (editing.isNew) {
            savePosts([post, ...posts]);
        } else {
            savePosts(posts.map(p => p.slug === post.slug ? post : p));
        }
        setEditing(null);
    };

    const deletePost = (slug) => {
        if (confirm("Delete this post?")) {
            savePosts(posts.filter(p => p.slug !== slug));
        }
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-slate-500 text-xs ml-2 font-mono">sudo blog-admin</span>
                        </div>
                        <div className="text-center mb-6">
                            <FaLock className="mx-auto text-[var(--color-orange)] text-3xl mb-3" />
                            <h1 className="text-2xl font-bold text-white">Blog Admin</h1>
                            <p className="text-slate-400 text-sm mt-1">Authentication required</p>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-slate-400 text-xs font-mono mb-2">$ password:</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-3 text-white font-mono focus:border-[var(--color-orange)] focus:outline-none transition-colors" placeholder="Enter password..." autoFocus />
                            </div>
                            {error && <p className="text-red-400 text-sm font-mono mb-4">{error}</p>}
                            <button type="submit" className="w-full px-6 py-3 bg-[var(--color-orange)] text-white font-bold rounded hover:bg-orange-600 transition-colors">Authenticate</button>
                        </form>
                    </div>
                    <Link to="/blog" className="block text-center mt-4 text-slate-400 hover:text-[var(--color-orange)] text-sm transition-colors">← Back to blog</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-[var(--color-orange)] transition-colors text-sm mb-2">
                            <FaArrowLeft size={12} /> Back to blog
                        </Link>
                        <h1 className="text-3xl font-bold text-white"><span className="text-[var(--color-orange)]">$</span> blog-admin</h1>
                    </div>
                    <button onClick={addPost} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-orange)] text-white font-bold rounded hover:bg-orange-600 transition-colors">
                        <FaPlus /> New Post
                    </button>
                </div>

                <p className="text-slate-400 text-sm mb-2 font-mono">
                    ℹ️ Posts saved here are stored in your browser (localStorage). To make them permanent, add them to <code className="text-[var(--color-orange)]">src/data/blogData.js</code>
                </p>

                <AnimatePresence>
                    {editing && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-slate-800/50 border border-[var(--color-orange)]/50 rounded-lg p-6 mb-8 overflow-hidden">
                            <h2 className="text-xl font-bold text-white mb-4">{editing.isNew ? "New Post" : "Edit Post"}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-slate-400 text-xs font-mono mb-1">Title *</label>
                                    <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-[var(--color-orange)] focus:outline-none" placeholder="Post title..." />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs font-mono mb-1">Tags (comma-separated)</label>
                                    <input value={typeof editing.tags === "string" ? editing.tags : editing.tags?.join(", ")} onChange={e => setEditing({ ...editing, tags: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-[var(--color-orange)] focus:outline-none" placeholder="DeepStream, C++, AI" />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs font-mono mb-1">Date</label>
                                    <input type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-[var(--color-orange)] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs font-mono mb-1">Read Time</label>
                                    <input value={editing.readTime} onChange={e => setEditing({ ...editing, readTime: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-[var(--color-orange)] focus:outline-none" placeholder="5 min" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-slate-400 text-xs font-mono mb-1">Excerpt</label>
                                <textarea rows={2} value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-[var(--color-orange)] focus:outline-none resize-y" placeholder="Brief summary..." />
                            </div>
                            <div className="mb-4">
                                <label className="block text-slate-400 text-xs font-mono mb-1">Content * (Markdown-like)</label>
                                <textarea rows={12} value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-[var(--color-orange)] focus:outline-none resize-y" placeholder="## Section heading&#10;&#10;Content here...&#10;&#10;```code block```" />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={savePost} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-orange)] text-white font-bold rounded hover:bg-orange-600 transition-colors"><FaSave /> Save</button>
                                <button onClick={() => setEditing(null)} className="px-4 py-2 border border-slate-700 text-slate-400 rounded hover:border-[var(--color-orange)] hover:text-white transition-colors">Cancel</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-4">
                    {posts.length === 0 && !editing && (
                        <div className="text-center py-16 text-slate-500 font-mono">
                            <p className="text-lg">$ ls ~/blog/drafts/</p>
                            <p className="mt-2">No local drafts yet. Click "New Post" to start writing.</p>
                        </div>
                    )}
                    {posts.map(post => (
                        <div key={post.slug} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-white font-bold truncate">{post.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                                    <span>{post.date}</span>
                                    <span>{Array.isArray(post.tags) ? post.tags.join(", ") : post.tags}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Link to={`/blog/${post.slug}`} className="p-2 text-slate-400 hover:text-[var(--color-orange)] transition-colors"><FaEye /></Link>
                                <button onClick={() => setEditing({ ...post, tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags })} className="p-2 text-slate-400 hover:text-[var(--color-orange)] transition-colors"><FaEdit /></button>
                                <button onClick={() => deletePost(post.slug)} className="p-2 text-slate-400 hover:text-red-400 transition-colors"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogAdmin;
