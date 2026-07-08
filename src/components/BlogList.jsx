import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { sortedPosts, noteLabel } from "../data/blogData";

const BlogList = () => {
    const [activeTag, setActiveTag] = useState("All");

    const allTags = useMemo(() => {
        const tags = new Set();
        sortedPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
        return ["All", ...Array.from(tags).sort()];
    }, []);

    const filteredPosts = useMemo(() => {
        if (activeTag === "All") return sortedPosts;
        return sortedPosts.filter((post) => post.tags.includes(activeTag));
    }, [activeTag]);

    return (
        <div className="mx-auto min-h-screen w-full max-w-[1200px] px-6 pb-20 pt-14 md:px-12">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h1 className="font-display text-[30px] font-extrabold tracking-[-1px] text-ink">Field Notes</h1>
                <span className="font-mono text-[11px] text-blueink">SECTION D — ALL NOTES</span>
            </div>

            {/* filter register */}
            <div className="mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter notes by tag">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        aria-pressed={activeTag === tag}
                        className={`px-3 py-1.5 font-mono text-[11px] transition-colors ${
                            activeTag === tag
                                ? "border border-blueink bg-blueink text-white"
                                : "border border-blueink/40 bg-white text-blueink hover:border-blueink"
                        }`}
                    >
                        {tag.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* note register rows */}
            <div className="mt-10 flex flex-col">
                {filteredPosts.map((post, i) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className={`grid grid-cols-1 gap-1 border-t border-blueink/25 px-2 py-[18px] transition-colors hover:bg-blueink/5 sm:grid-cols-[140px_1fr_auto] sm:gap-6 ${
                            i === filteredPosts.length - 1 ? "border-b" : ""
                        }`}
                    >
                        <div className="flex flex-row gap-3 font-mono text-[11px] text-label sm:flex-col sm:gap-1">
                            <span>{noteLabel(post.slug)}</span>
                            <span>{post.date}</span>
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-display text-[16px] font-bold text-ink">{post.title}</h2>
                            <p className="mt-1 line-clamp-1 text-[14px] text-body">{post.excerpt}</p>
                        </div>
                        <span className="font-mono text-[11px] text-blueink">READ →</span>
                    </Link>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="fig-card mt-10 px-8 py-14 text-center">
                    <span className="fig-tag">FIG. 404 — EMPTY REGISTER</span>
                    <p className="font-mono text-[13px] text-body">No notes filed under “{activeTag}”.</p>
                    <button
                        onClick={() => setActiveTag("All")}
                        className="mt-4 font-mono text-[12px] font-bold text-blueink hover:text-blueink-soft"
                    >
                        SHOW ALL NOTES →
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogList;
