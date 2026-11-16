import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { LegalDocument } from "@/components/legal-document";
export const metadata: Metadata = { title: "Privacy Policy — Example" };
export default function LegalPage() { return <SiteShell footer={false}><LegalDocument type="privacy"/></SiteShell>; }
