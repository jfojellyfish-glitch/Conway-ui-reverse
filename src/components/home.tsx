import Link from "next/link";
import { SiteShell } from "./site-shell";
import { Icon } from "./icons";
import { SignalField } from "./signal-field";
import { links } from "@/lib/site";

export function Home() {
  return <SiteShell home>
    <main id="main" className="hero page-gutters" tabIndex={-1}>
      <div className="hero-copy">
        <h1>Application Model<br/>for Your Projects</h1>
        <p className="hero-description">Put your data to work with Example software</p>
        <div className="hero-actions flex items-center gap-2.5">
          <a className="button button-primary contact-button" href={links.contact}>Contact Team<Icon name="arrow"/></a>
          <Link className="button button-outline careers-button" href="/careers">Careers</Link>
        </div>
      </div>
      <SignalField/>
    </main>
  </SiteShell>;
}
