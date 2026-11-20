import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getPost, posts } from "@/lib/posts";
export function generateStaticParams(){return posts.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=getPost(slug);return {title:p?`${p.title} — Zen Trading`:"Research Journal — Zen Trading",description:p?.excerpt};}
export default async function Article({params}:{params:Promise<{slug:string}>}){
const {slug}=await params;const post=getPost(slug);if(!post)notFound();
return <SiteShell><main id="main" className="journal-article page-gutters" tabIndex={-1}><Link className="journal-back" href="/blog">← All research</Link><article><span className="eyebrow">{post.tag} / {post.date} / {post.readMinutes} min read</span><h1>{post.title}</h1><p className="journal-abstract">{post.excerpt}</p><div className="journal-prose">{post.sections.map((s,i)=><section key={i}>{s.heading&&<h2>{s.heading}</h2>}{s.paragraphs.map((p,j)=><p key={j}>{p}</p>)}</section>)}</div></article></main></SiteShell>;
}
