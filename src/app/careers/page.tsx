import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { CareerList } from "@/components/careers";
export const metadata: Metadata = { title: "Careers — Zen Trading" };
export default function CareersPage() { return <SiteShell><CareerList/></SiteShell>; }
