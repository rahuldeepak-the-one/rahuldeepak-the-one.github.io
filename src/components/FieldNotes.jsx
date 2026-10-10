import { Link } from "react-router-dom";
import { sortedPosts } from "../data/blogData";

const monthYear = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" });

/** Blog teaser — the three latest notes. */
const FieldNotes = () => (
    <div className="flex flex-col gap-[14px]">
        <Link to="/blog" className="font-mono text-[11px] tracking-[1px] text-accent hover:text-white">
            FIELD NOTES · BLOG
        </Link>
        <div className="flex flex-col">
            {sortedPosts.slice(0, 3).map((post) => (
                <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group grid grid-cols-[80px_1fr_auto] items-baseline gap-[14px] border-t border-line py-2.5"
                >
                    <span className="font-mono text-[11px] text-dim">{monthYear(post.date)}</span>
                    <span className="text-[15px] font-semibold text-white group-hover:text-accent">{post.title}</span>
                    <span className="text-[14px] text-accent">Read →</span>
                </Link>
            ))}
        </div>
    </div>
);

export default FieldNotes;
