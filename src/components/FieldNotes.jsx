import { Link } from "react-router-dom";
import { sortedPosts, noteLabel } from "../data/blogData";

/** Blog teaser — the two latest notes as drawing-register rows. */
const FieldNotes = () => (
    <div className="flex flex-col">
        {sortedPosts.slice(0, 2).map((post, i) => (
            <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`grid grid-cols-1 items-baseline gap-1 border-t border-blueink/25 px-2 py-[18px] transition-colors hover:bg-blueink/5 sm:grid-cols-[140px_1fr_auto] sm:gap-6 ${
                    i === 1 ? "border-b" : ""
                }`}
            >
                <span className="font-mono text-[11px] text-label">{noteLabel(post.slug)}</span>
                <span className="font-display text-[16px] font-bold text-ink">{post.title}</span>
                <span className="font-mono text-[11px] text-blueink">READ →</span>
            </Link>
        ))}
    </div>
);

export default FieldNotes;
