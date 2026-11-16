"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { privacy, terms, sectionId, type LegalBlock } from "@/lib/legal";
import { links } from "@/lib/site";

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "list") return <ul>{block.items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
  if (block.type === "subheading") return <h4>{block.text}</h4>;
  return <p>{block.text}</p>;
}
export function LegalDocument({ type }: { type: "terms" | "privacy" }) {
  const document = type === "terms" ? terms : privacy;
  const [active, setActive] = useState(sectionId(document.sections[0].title));
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-100px 0px -65% 0px" });
    const sections = window.document.querySelectorAll(".legal-section");
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [type]);

  return <main id="main" className="legal-main"><div className="legal-layout">
    <aside className="legal-sidebar"><nav className="legal-contents" aria-label="Legal contents"><p>Legal</p>
      {(["terms", "privacy"] as const).map(page => <div key={page}>
        <Link href={"/" + page} className="legal-page-link" aria-current={page === type ? "page" : undefined}>{page === "terms" ? "Terms of Service" : "Privacy Policy"}</Link>
        {page === type && <div className="legal-toc">{document.sections.map(section => <button key={section.title} aria-current={active === sectionId(section.title) ? "location" : undefined} onClick={() => {
          const id = sectionId(section.title);
          const target = window.document.getElementById(id);
          if (!target) return;
          setActive(id);
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 100, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        }}>{section.title}</button>)}</div>}
      </div>)}
    </nav></aside>
    <article className={"legal-article " + type + "-article"}>
      <h1>{document.title}</h1><p className="legal-date">Last updated March 22, 2026</p>
      <div className="legal-intro">{document.introduction.map((text, index) => <p key={index}>{text}</p>)}</div>
      {document.sections.map(section => <section className="legal-section" id={sectionId(section.title)} key={section.title}><h3>{section.title}</h3>{section.blocks.map((block, index) => <Block key={index} block={block}/>)}</section>)}
      <div className="legal-end"><p>Example Organization{type === "terms" && <><br/>Example City, Region</>}<br/>Questions? Contact <a href={links.contact}>team@example.com</a></p></div>
    </article>
  </div></main>;
}
