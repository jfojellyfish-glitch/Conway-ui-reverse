import Link from "next/link";
import { Icon } from "./icons";
import { links } from "@/lib/site";
import { investorDeckHref } from "@/lib/live-offerings";

export function ProofBar() {
  return <div className="zen-proof page-gutters" aria-label="Research process"><span><strong>01</strong> Research</span><i/><span><strong>02</strong> Reason</span><i/><span><strong>03</strong> Execute</span><i/><span><strong>04</strong> Audit</span></div>;
}

export function ApproachSection(){
  return <section id="approach" className="zen-approach page-gutters" aria-labelledby="approach-heading">
    <div className="zen-section-top"><div><p className="eyebrow">// OUR APPROACH</p><h2 id="approach-heading">Machines do the research.<br/><span className="text-accent">People own the risk.</span></h2></div><p>We designed an AI-native investment process, not a human workflow with AI added on.</p></div>
    <div className="zen-approach-grid">
      <div className="zen-approach-statement"><span className="zen-mono">THE OPERATING PRINCIPLE</span><p>Research, signals and execution are built around machine reasoning. Human oversight stays focused on risk and capital allocation.</p><div className="zen-evidence-line"><span/> Evidence first. Decisions traceable.</div></div>
      <div className="zen-approach-steps">
        <article><span>01</span><div><h3>Read the evidence</h3><p>Models work with company filings and supply-chain relationships rather than isolated market headlines.</p></div></article>
        <article><span>02</span><div><h3>Form and test a thesis</h3><p>Signals are researched and measured before becoming portfolio decisions.</p></div></article>
        <article><span>03</span><div><h3>Trace every decision</h3><p>Review the cited thesis, the resulting strategy weights and the execution path.</p></div></article>
      </div>
    </div>
  </section>;
}

export function TeamAndFund(){
  return <><section id="team" className="zen-team page-gutters" aria-labelledby="team-heading"><div className="zen-section-top"><div><p className="eyebrow">// WHO WE ARE</p><h2 id="team-heading">AI-native.<br/><span className="text-accent">Builders by design.</span></h2></div><p>We build and run the infrastructure behind our own research process.</p></div><div className="zen-values-grid">
    <article><span className="zen-mono">01 / AI-NATIVE</span><h3>Built around models</h3><p>Reasoning systems sit at the center of research, with people guiding allocation and risk.</p></article>
    <article><span className="zen-mono">02 / BUILDERS</span><h3>Designed to deploy</h3><p>Internal pipelines, strategy infrastructure and execution systems are developed as working products.</p></article>
    <article><span className="zen-mono">03 / ALIGNMENT</span><h3>One operating stack</h3><p>Zen Trading aims to use the research and execution systems it provides to clients.</p></article>
  </div></section>
  <section id="invest" className="zen-invest page-gutters" aria-labelledby="invest-heading"><div className="zen-invest-grid"><div><p className="eyebrow">// INVEST IN THE FUND</p><h2 id="invest-heading">Research-driven capital.<br/><span>Risk-aware execution.</span></h2><p>Learn about Zen Trading's systematic, AI-driven approach and investor materials.</p><a className="button button-primary" href={investorDeckHref}>Request the deck <Icon name="right"/></a><small>Investor information is intended for accredited and qualified investors only. Investing involves risk, including possible loss of principal.</small></div><div className="zen-invest-lines"><p><span>01</span> Systematic, AI-driven research</p><p><span>02</span> Risk and drawdown controls</p><p><span>03</span> Source-to-execution traceability</p></div></div></section></>;
}

export function JournalTeaser(){return <section className="zen-journal-teaser page-gutters"><div><span className="eyebrow">// RESEARCH JOURNAL</span><h2>Research you can <em>read into.</em></h2><p>Articles and engineering notes from Zen Trading.</p></div><Link className="button button-outline" href="/blog">Read the journal <Icon name="right"/></Link></section>}
