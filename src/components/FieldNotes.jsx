import { Link } from "react-router-dom";
import { sortedPosts, noteLabel } from "../data/blogData";

/** Blog teaser — the two latest notes as drawing-register rows. */
const FieldNotes = () => (
    <div className="flex flex-col">
        {sortedPosts.slice(0, 2).map((post, i) => (
            <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`group grid grid-cols-1 items-baseline gap-1 rounded-2xl px-4 py-6 transition-colors duration-500 hover:bg-ink/[0.03] sm:grid-cols-[120px_1fr_auto] sm:gap-6 ${
                    i > 0 ? "border-t border-ink/[0.06]" : ""
                }`}
            >
                <span className="font-mono text-[12px] text-label">{noteLabel(post.slug)}</span>
                <span className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">{post.title}</span>
                <span className="text-[14px] font-medium text-blueink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">Read →</span>
            </Link>
        ))}
    </div>
);

export default FieldNotes;
