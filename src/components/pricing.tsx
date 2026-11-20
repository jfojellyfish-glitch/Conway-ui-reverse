import { plans } from "@/lib/pricing";
import { Icon } from "./icons";

export function Pricing() {
  return <main id="main" className="pricing-main page-gutters" tabIndex={-1}>
    <header className="pricing-intro">
      <p className="eyebrow">// Subscriptions</p>
      <h1>Two research tools.<br/>One clear monthly<br/><span className="text-accent">plan each.</span></h1>
      <p className="pricing-lede">Research with more clarity. Stay informed with source-grounded market intelligence. Choose what suits your workflow.</p>
    </header>
    <div className="plan-grid">
      {plans.map(plan => <article key={plan.slug} className={plan.featured ? "plan-card plan-featured" : "plan-card"} aria-labelledby={`plan-${plan.slug}`}>
        <div className="plan-card-top">
          <p className="eyebrow">{plan.eyebrow}</p>
          <h2 id={`plan-${plan.slug}`}>{plan.name}</h2>
          <p className="plan-price"><strong>{plan.price.split(" / ")[0]}</strong><span className="plan-period">/ month</span></p>
          <p className="plan-tagline">{plan.tagline}</p>
        </div>
        <ul className="plan-features">{plan.features.map(f => <li key={f}><Icon name="right" width="11" height="11"/>{f}</li>)}</ul>
        <div className="plan-card-bottom">
          <ul className="stage-tags">{plan.tags.map(t => <li key={t}>{t}</li>)}</ul>
          <a className="button button-dark plan-cta" href={plan.checkout} target="_blank" rel="noopener noreferrer" aria-label={`Review ${plan.name} subscription on Stripe`}>Subscribe <Icon name="arrow"/></a>
        </div>
      </article>)}
    </div>
    <p className="pricing-outro">Payments are handled by Stripe. Review the product, final charge and subscription terms on the checkout page.</p>
  </main>;
}
