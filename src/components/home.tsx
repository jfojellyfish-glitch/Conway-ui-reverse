import { SiteShell } from "./site-shell";
import Link from "next/link";
import { Icon } from "./icons";
import { plans } from "@/lib/pricing";
import { SignalField } from "./signal-field";
import { SystemsLoop } from "./systems-loop";
import { PipelineFlow } from "./pipeline-flow";
import { links } from "@/lib/site";

export function Home() {
  return <SiteShell home>
    <main id="main" className="home-main" tabIndex={-1}>
    <div className="hero page-gutters">
      <div className="hero-copy">
        <h1>Research built<br/>to be<br/><span className="text-accent">verified.</span></h1>
        <p className="hero-description">Sourced claims.<br/>Costed research.<br/>Measured returns.</p>
        <div className="hero-actions flex flex-wrap items-center gap-2.5">
          <Link className="button button-primary" href="/pricing">Subscribe<Icon name="right"/></Link>
          <a className="button button-outline" href="#systems">Explore our systems</a>
          <a className="button button-outline" href={links.github} target="_blank" rel="noopener noreferrer">View GitHub<Icon name="arrow"/></a>
        </div>
      </div>
      <SignalField/>
    </div>
    <SystemsLoop/>
    <PipelineFlow/>
    <section className="subscribe-strip page-gutters" aria-labelledby="subscribe-title">
      <p className="eyebrow">// Subscriptions</p>
      <h2 id="subscribe-title">Use the agents <span className="text-accent">yourself.</span></h2>
      <ul className="subscribe-plans">{plans.map(plan => <li key={plan.slug}>
        <div><h3>{plan.name}</h3><p>{plan.price}<span> / month</span></p></div>
        <Link className="button button-dark" href="/pricing">Subscribe<Icon name="right"/></Link>
      </li>)}</ul>
    </section>
    </main>
  </SiteShell>;
}
