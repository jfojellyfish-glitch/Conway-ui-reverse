import { plans } from "@/lib/pricing";
import { links } from "@/lib/site";
import { Icon } from "./icons";

export function Pricing() {
  return <main id="main" className="pricing-main page-gutters" tabIndex={-1}>
    <header className="pricing-intro">
      <p className="eyebrow">// Subscriptions</p>
      <h1>Two agents.<br/>One monthly price<br/><span className="text-accent">each.</span></h1>
      <p className="pricing-lede">Two separate monthly subscriptions. Each Subscribe button leads directly to the relevant Stripe payment page supplied by Yvette. Verify the product and amount before paying.</p>
    </header>

    <div className="plan-grid">
      {plans.map(plan => <article key={plan.slug} className={plan.featured ? "plan-card plan-featured" : "plan-card"} aria-labelledby={`plan-${plan.slug}`}>
        <p className="eyebrow">{plan.eyebrow}</p>
        <h2 id={`plan-${plan.slug}`}>{plan.name}</h2>
        <p className="plan-price"><strong>{plan.price}</strong></p>
        <p className="plan-tagline">{plan.tagline}</p>
        <ul className="plan-features">{plan.features.map(f => <li key={f}><Icon name="right" width="11" height="11"/>{f}</li>)}</ul>
        <ul className="stage-tags">{plan.tags.map(t => <li key={t}>{t}</li>)}</ul>
        <a className="button button-dark plan-cta" href={plan.checkout} target="_blank" rel="noopener noreferrer" aria-label={`Review ${plan.name} subscription on Stripe`}>Subscribe <Icon name="arrow"/></a>
      </article>)}
    </div>

    <p className="pricing-outro">Newsletter: $9.99/month on this page, linked to Yvette’s Newsletter Stripe payment page. Coding Agent: $49/month on this page, linked to Yvette’s Coding Agent Stripe payment page. Verify the actual checkout product and amount before paying.</p>
  </main>;
}
