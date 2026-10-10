import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts, { noteLabel } from "../data/blogData";
import DimensionLine from "./DimensionLine";

const BlogPost = () => {
    const { slug } = useParams();
    const [linkCopied, setLinkCopied] = useState(false);
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="mx-auto flex min-h-screen w-full max-w-[720px] items-center px-6 pb-20 pt-14">
                <div className="fig-card w-full px-8 py-14 text-center">
                    <span className="fig-tag">FIG. 404 — NOT FOUND</span>
                    <p className="font-mono text-[13px] text-body">No note filed under “{slug}”.</p>
                    <Link
                        to="/blog"
                        className="mt-6 inline-block bg-blueink px-[30px] py-[13px] font-mono text-[13px] font-bold text-white transition-colors hover:bg-blueink-soft"
                    >
                        ← ALL NOTES
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
        <div className="mx-auto min-h-screen w-full max-w-[720px] px-6 pb-20 pt-14">
            <Link to="/blog" className="font-mono text-[12px] text-blueink transition-colors hover:text-blueink-soft">
                ← ALL NOTES
            </Link>

            <header className="mt-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[11px] text-label">
                    <span>
                        {noteLabel(post.slug)} · {post.date} · {post.readTime.toUpperCase()}
                    </span>
                    <button onClick={copyLink} className="text-blueink transition-colors hover:text-blueink-soft">
                        {linkCopied ? "LINK COPIED ✓" : "SHARE ↗"}
                    </button>
                </div>
                <h1 className="mt-3 font-display text-[clamp(28px,5vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-ink">
                    {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="chip">{tag.toUpperCase()}</span>
                    ))}
                </div>
            </header>

            <DimensionLine animated={false} className="my-10" />

            <article className="text-[16px] leading-[1.8] text-body">{renderContent(post.content)}</article>

            <div className="mt-16 border-t border-blueink/25 pt-8">
                <Link
                    to="/blog"
                    className="inline-block border border-dashed border-blueink/55 bg-white/60 px-[30px] py-[13px] font-mono text-[13px] text-blueink transition-colors hover:border-solid hover:border-blueink"
                >
                    ← ALL NOTES
                </Link>
            </div>
        </div>
    );
};

function renderContent(content) {
    const lines = content.trim().split("\n");
    const elements = [];
    let inCode = false, codeLines = [], key = 0, inTable = false, tRows = [];

    const renderTable = () => (
        <div key={key++} className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-blueink/35">
                        {tRows[0]?.map((c, ci) => (
                            <th key={ci} className="px-3 py-2 text-left font-mono text-[12px] font-bold text-blueink">{c}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tRows.slice(1).map((r, ri) => (
                        <tr key={ri} className="border-b border-blueink/15 hover:bg-blueink/5">
                            {r.map((c, ci) => (
                                <td key={ci} className="px-3 py-2 text-body">{c}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith("```")) {
            if (inCode) {
                elements.push(
                    <pre key={key++} className="my-6 overflow-x-auto border border-dashed border-blueink/45 bg-white p-4 font-mono text-[13px] leading-relaxed text-ink">
                        <code className="border-0 bg-transparent p-0 text-[inherit] text-ink">{codeLines.join("\n")}</code>
                    </pre>
                );
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
            elements.push(renderTable());
            tRows = []; inTable = false;
        }

        if (line.startsWith("## ")) {
            elements.push(
                <h2 key={key++} className="mt-10 mb-4 border-l-[3px] border-blueink pl-3 font-display text-2xl font-bold text-ink">
                    {line.slice(3)}
                </h2>
            );
        } else if (line.startsWith("### ")) {
            elements.push(<h3 key={key++} className="mt-8 mb-3 font-display text-xl font-bold text-ink">{line.slice(4)}</h3>);
        } else if (/^\d+\.\s/.test(line.trim())) {
            const c = line.replace(/^\d+\.\s/, "");
            elements.push(
                <div key={key++} className="mb-2 ml-4 flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-mono text-[14px] font-bold text-blueink">{line.match(/^\d+/)[0]}.</span>
                    <span dangerouslySetInnerHTML={{ __html: c.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>') }} />
                </div>
            );
        } else if (line.trim().startsWith("- ")) {
            const c = line.trim().slice(2);
            elements.push(
                <div key={key++} className="mb-2 ml-4 flex items-start gap-3">
                    <span className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-blueink"></span>
                    <span dangerouslySetInnerHTML={{ __html: c.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>') }} />
                </div>
            );
        } else if (line.trim()) {
            elements.push(
                <p
                    key={key++}
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                        __html: line
                            .replace(/`([^`]+)`/g, "<code>$1</code>")
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>'),
                    }}
                />
            );
        }
    }

    if (inTable && tRows.length > 0) {
        elements.push(renderTable());
    }
    return elements;
}

export default BlogPost;
