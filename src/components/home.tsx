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
      <ul className="subscribe-plans">{plans.map(plan => <li key={plan.slug}>
        <div><h3>{plan.name}</h3><p>{plan.price}</p></div>
        <a className="button button-dark" href={plan.checkout} target="_blank" rel="noopener noreferrer" aria-label={`Review ${plan.name} subscription on Stripe`}>Subscribe <Icon name="arrow"/></a>
      </li>)}</ul>
      <p className="checkout-note">Both products link to payment pages supplied by Yvette. Newsletter is $9.99/month on this page; verify the product and amount on Stripe before paying. Coding Agent is shown as $49/month; verify the actual Stripe charge before paying.</p>
    </section>
    <JournalTeaser/>
    </main>
  </SiteShell>;
}
