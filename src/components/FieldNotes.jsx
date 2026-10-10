import { Link } from "react-router-dom";
import { sortedPosts, noteLabel } from "../data/blogData";

/** Blog teaser — the latest notes as register rows. */
const FieldNotes = () => (
    <ul className="border-t border-line">
        {sortedPosts.slice(0, 3).map((post) => (
            <li key={post.slug} className="border-b border-line">
                <Link
                    to={`/blog/${post.slug}`}
                    className="group grid grid-cols-1 items-baseline gap-1 py-5 transition-colors sm:grid-cols-[160px_1fr_auto] sm:gap-6"
                >
                    <span className="font-mono text-[12px] text-label">{noteLabel(post.slug)} · {post.date.slice(0, 7)}</span>
                    <span className="text-[17px] font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-blueink">
                        {post.title}
                    </span>
                    <span className="font-mono text-[12px] text-label transition-all group-hover:translate-x-1 group-hover:text-blueink">
                        {post.readTime} →
                    </span>
                </Link>
            </li>
        ))}
    </ul>
);

export default FieldNotes;
