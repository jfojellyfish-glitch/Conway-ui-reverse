"use client";
import Link from "next/link";
import { useState } from "react";
import { roles } from "@/lib/careers";
import { Icon } from "./icons";

export function CareerList() {
  const [filter, setFilter] = useState("All");
  return <main id="main" className="careers-main">
    <h1 className="sr-only">Careers</h1>
    <nav className="career-filters" aria-label="Filter positions">{["All", "Research", "Engineering", "Operations"].map(category => <button key={category} aria-pressed={category === filter} onClick={() => setFilter(category)}>{category}</button>)}</nav>
    <div className="career-list" aria-live="polite">{roles.filter(role => filter === "All" || role.category === filter).map(role => <Link className="career-card" key={role.slug} href={"/careers/" + role.slug}>
      <div><h3>{role.title}</h3><p>Full-Time · Example City</p></div><span className="small-action">Apply<Icon name="right" width="12" height="12"/></span>
    </Link>)}</div>
  </main>;
}
