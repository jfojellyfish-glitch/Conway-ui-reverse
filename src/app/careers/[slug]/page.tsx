import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { Icon } from "@/components/icons";
import { roles } from "@/lib/careers";

export function generateStaticParams() { return roles.map(({ slug }) => ({ slug })); }

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = roles.find(item => item.slug === slug);
  if (!role) notFound();
  return <SiteShell><main id="main" className="role-main"><article className="role-article">
    <Link className="small-action" href="/careers"><Icon name="left" width="11" height="11"/>Back to careers</Link>
    <div className="role-heading"><h1>{role.title}</h1><p>Role details to be announced</p></div>
    <div className="role-copy">
      <p>The full job description, location, employment terms and application instructions for this position have not yet been published.</p>
      <p>For general enquiries, please <a href="mailto:support@zentradings.com">contact Zen Trading</a>.</p>
    </div>
  </article></main></SiteShell>;
}
