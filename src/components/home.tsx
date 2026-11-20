import { SiteShell } from "./site-shell";
import Link from "next/link";
import { Icon } from "./icons";
import { plans } from "@/lib/pricing";
import { ZenOsDemo } from "./zen-os-demo";
import { ProcessStrip } from "./process-strip";
import { SystemsLoop } from "./systems-loop";
import { PipelineFlow } from "./pipeline-flow";
import { links } from "@/lib/site";
import { JournalTeaser } from "./zen-bridge";

export function Home() {
  return <SiteShell home>
    <main id="main" className="home-main" tabIndex={-1}>
    <div className="hero page-gutters">
      <div className="hero-copy">
        <h1>Research built<br/>to be<br/><span className="text-accent">verified.</span></h1>
        <p className="hero-description">Sourced claims.<br/>Costed research.<br/>Measured returns.</p>
        <div className="hero-actions flex flex-wrap items-center gap-2.5">
          <Link className="button button-primary" href="/pricing">Explore plans<Icon name="right"/></Link>
          <a className="button button-outline" href="#systems">Explore our systems</a>
          <a className="button button-outline" href={links.github} target="_blank" rel="noopener noreferrer">View GitHub<Icon name="arrow"/></a>
        </div>
      </div>
      <ZenOsDemo/>
    </div>
    <ProcessStrip/>
    <SystemsLoop/>
    <PipelineFlow/>
    <section className="subscribe-strip page-gutters" aria-labelledby="subscribe-title">
      <p className="eyebrow">// Subscriptions</p>
      <h2 id="subscribe-title">Use the agents <span className="text-accent">yourself.</span></h2>
      <p className="subscription-subtitle">Quant research tools and market intelligence, on your terms.</p>
      <ul className="subscribe-plans">{plans.map((plan, index) => <li key={plan.slug} className={`subscription-card${plan.featured ? " is-featured" : ""}`}>
        <div className="subscription-card-main">
          <p className="subscription-card-kicker">{String(index + 1).padStart(2, "0")} / {plan.eyebrow}</p>
          <h3>{plan.name}</h3>
          <p className="subscription-card-summary">{plan.slug === "coding-agent" ? "Agent-assisted quantitative research and code review." : "Source-grounded market briefs delivered to your inbox."}</p>
        </div>
        <div className="subscription-card-bottom">
          <p className="subscription-card-price"><span className="subscription-price-amount">{plan.price.split(" / ")[0]}</span><span className="subscription-price-unit">/ month</span></p>
          <a className="button button-dark" href={plan.checkout} target="_blank" rel="noopener noreferrer" aria-label={`Review ${plan.name} subscription on Stripe`}>Subscribe <Icon name="arrow"/></a>
        </div>
      </li>)}</ul>
      <p className="subscription-footnote">Checkout is hosted by Stripe. Confirm your final billing amount and renewal terms before subscribing.</p>
    </section>
    <JournalTeaser/>
    </main>
  </SiteShell>;
}
