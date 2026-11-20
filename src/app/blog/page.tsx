import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { SiteShell } from "@/components/site-shell";
import { posts } from "@/lib/posts";
export const metadata: Metadata = { title: "Research Journal — Zen Trading", description: "Research and insight from the Zen Trading team" };
export default function BlogPage() {
  return <SiteShell><main id="main" className="journal page-gutters" tabIndex={-1}>
    <div className="journal-heading"><span className="eyebrow">// Dispatches from the research floor</span><h1>Research, <span className="text-accent">in the open.</span></h1><p>Notes on machine reasoning, market structure and the infrastructure behind our research.</p></div>
    <div className="journal-grid">{posts.map((post,i)=><Link key={post.slug} href={`/blog/${post.slug}`} className="journal-card"><div className="journal-num">{String(i+1).padStart(2,"0")} / {post.tag}</div><h2>{post.title}</h2><p>{post.excerpt}</p><div className="journal-bottom"><span>{post.date} · {post.readMinutes} min read</span><span>Read article <Icon name="arrow" width="13" height="13"/></span></div></Link>)}</div>
  </main></SiteShell>;
}
