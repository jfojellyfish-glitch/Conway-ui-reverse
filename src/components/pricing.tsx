import { plans } from "@/lib/pricing";
import { links } from "@/lib/site";
import { Icon } from "./icons";

export function Pricing() {
  return <main id="main" className="pricing-main page-gutters" tabIndex={-1}>
    <header className="pricing-intro">
      <p className="eyebrow">// Subscriptions</p>
      <h1>Two agents.<br/>One monthly price<br/><span className="text-accent">each.</span></h1>
      <p className="pricing-lede">A coding agent for quant research and an agent that writes a sourced market brief. Both keep the sources, checks, and costs behind their work. Billed monthly, cancel any time. Prices are placeholders until billing is live.</p>
    </header>

    <div className="plan-grid">
      {plans.map(plan => <article key={plan.slug} className={plan.featured ? "plan-card plan-featured" : "plan-card"} aria-labelledby={`plan-${plan.slug}`}>
        <p className="eyebrow">{plan.eyebrow}</p>
        <h2 id={`plan-${plan.slug}`}>{plan.name}</h2>
        <p className="plan-price"><strong>{plan.price}</strong><span>/ month</span></p>
        <p className="plan-tagline">{plan.tagline}</p>
        <ul className="plan-features">{plan.features.map(f => <li key={f}><Icon name="right" width="11" height="11"/>{f}</li>)}</ul>
        <ul className="stage-tags">{plan.tags.map(t => <li key={t}>{t}</li>)}</ul>
        <a className={plan.featured ? "button button-primary plan-cta" : "button button-dark plan-cta"} href={plan.checkout} target="_blank" rel="noopener noreferrer">
          Subscribe monthly<Icon name="arrow"/>
        </a>
      </article>)}
    </div>

    <p className="pricing-outro">Need both, or a team plan? <a href={links.contact}>Contact us<Icon name="arrow" width="11" height="11"/></a></p>
  </main>;
}
