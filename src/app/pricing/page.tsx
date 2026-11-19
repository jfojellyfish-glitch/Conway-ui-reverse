import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { Pricing } from "@/components/pricing";
export const metadata: Metadata = { title: "Pricing — Zen Trading" };
export default function PricingPage() { return <SiteShell><Pricing/></SiteShell>; }
