import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit, FaSave, FaEye } from "react-icons/fa";

const ADMIN_PASSWORD = import.meta.env.VITE_BLOG_ADMIN_PASSWORD || "";
const STORAGE_KEY = "blog_admin_posts";

const inputClass =
    "w-full border border-dashed border-blueink/45 bg-white px-3 py-2 font-mono text-sm text-ink placeholder:text-label/60 focus:border-solid focus:border-blueink focus:outline-none transition-colors";
const labelClass = "mb-1 block font-mono text-[11px] uppercase tracking-wide text-label";
const solidButtonClass =
    "flex items-center gap-2 bg-blueink px-4 py-2 font-mono text-[13px] font-bold text-white transition-colors hover:bg-blueink-soft";

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
            <div className="flex min-h-screen items-center justify-center px-6 pb-20 pt-14">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
                    <div className="fig-card p-8">
                        <span className="fig-tag">FIG. X1 — ACCESS CONTROL</span>
                        <h1 className="font-display text-2xl font-extrabold text-ink">Notes Admin</h1>
                        <p className="mt-1 font-mono text-[12px] text-label">AUTHENTICATION REQUIRED</p>
                        <form onSubmit={handleLogin} className="mt-6">
                            <div className="mb-4">
                                <label className={labelClass} htmlFor="admin-password">Password</label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={inputClass}
                                    placeholder="Enter password…"
                                    autoFocus
                                />
                            </div>
                            {error && <p className="mb-4 font-mono text-[12px] text-red-600">{error}</p>}
                            <button type="submit" className={`${solidButtonClass} w-full justify-center py-3`}>
                                AUTHENTICATE →
                            </button>
                        </form>
                    </div>
                    <Link to="/blog" className="mt-4 block text-center font-mono text-[12px] text-blueink transition-colors hover:text-blueink-soft">
                        ← ALL NOTES
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="mx-auto min-h-screen w-full max-w-[1200px] px-6 pb-20 pt-14 md:px-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <Link to="/blog" className="font-mono text-[12px] text-blueink transition-colors hover:text-blueink-soft">
                        ← ALL NOTES
                    </Link>
                    <h1 className="mt-2 font-display text-[30px] font-extrabold tracking-[-1px] text-ink">Notes Admin</h1>
                </div>
                <button onClick={addPost} className={solidButtonClass}>
                    <FaPlus aria-hidden="true" /> NEW NOTE
                </button>
            </div>

            <p className="mt-4 font-mono text-[12px] text-label">
                Drafts live in this browser (localStorage). To publish permanently, add them to <code>src/data/blogData.js</code>.
            </p>

            <AnimatePresence>
                {editing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fig-card mt-8 overflow-hidden p-6"
                    >
                        <span className="fig-tag">{editing.isNew ? "FIG. X2 — NEW NOTE" : "FIG. X2 — EDIT NOTE"}</span>
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className={labelClass}>Title *</label>
                                <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className={inputClass} placeholder="Note title…" />
                            </div>
                            <div>
                                <label className={labelClass}>Tags (comma-separated)</label>
                                <input value={typeof editing.tags === "string" ? editing.tags : editing.tags?.join(", ")} onChange={e => setEditing({ ...editing, tags: e.target.value })} className={inputClass} placeholder="DeepStream, C++, AI" />
                            </div>
                            <div>
                                <label className={labelClass}>Date</label>
                                <input type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Read time</label>
                                <input value={editing.readTime} onChange={e => setEditing({ ...editing, readTime: e.target.value })} className={inputClass} placeholder="5 min" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Excerpt</label>
                            <textarea rows={2} value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} className={`${inputClass} resize-y`} placeholder="Brief summary…" />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Content * (Markdown-like)</label>
                            <textarea rows={12} value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} className={`${inputClass} resize-y`} placeholder={"## Section heading\n\nContent here…\n\n```code block```"} />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={savePost} className={solidButtonClass}><FaSave aria-hidden="true" /> SAVE</button>
                            <button
                                onClick={() => setEditing(null)}
                                className="border border-dashed border-blueink/45 bg-white px-4 py-2 font-mono text-[13px] text-blueink transition-colors hover:border-solid hover:border-blueink"
                            >
                                CANCEL
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-4">
                {posts.length === 0 && !editing && (
                    <div className="fig-card px-8 py-14 text-center">
                        <span className="fig-tag">FIG. X3 — EMPTY REGISTER</span>
                        <p className="font-mono text-[13px] text-body">No local drafts yet. Use NEW NOTE to start writing.</p>
                    </div>
                )}
                {posts.map(post => (
                    <div key={post.slug} className="fig-card flex items-center justify-between gap-4 px-6 py-4">
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate font-display text-[16px] font-bold text-ink">{post.title}</h3>
                            <div className="mt-1 flex items-center gap-3 font-mono text-[11px] text-label">
                                <span>{post.date}</span>
                                <span>{Array.isArray(post.tags) ? post.tags.join(", ") : post.tags}</span>
                            </div>
                        </div>
                        <div className="flex shrink-0 gap-1">
                            <Link to={`/blog/${post.slug}`} aria-label={`View ${post.title}`} className="p-2 text-label transition-colors hover:text-blueink"><FaEye aria-hidden="true" /></Link>
                            <button onClick={() => setEditing({ ...post, tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags })} aria-label={`Edit ${post.title}`} className="p-2 text-label transition-colors hover:text-blueink"><FaEdit aria-hidden="true" /></button>
                            <button onClick={() => deletePost(post.slug)} aria-label={`Delete ${post.title}`} className="p-2 text-label transition-colors hover:text-red-600"><FaTrash aria-hidden="true" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogAdmin;
