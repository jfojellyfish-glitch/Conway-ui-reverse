import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { Icon } from "@/components/icons";
import { ApplicationForm } from "@/components/application-form";
import { roles, roleIntroduction, roleSections } from "@/lib/careers";

export function generateStaticParams() { return roles.map(({ slug }) => ({ slug })); }
export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = roles.find(item => item.slug === slug);
  if (!role) notFound();
  return <SiteShell><main id="main" className="role-main"><article className="role-article">
    <Link className="small-action" href="/careers"><Icon name="left" width="11" height="11"/>Back</Link>
    <div className="role-heading"><h1>{role.title}</h1><p>Full-Time · Example City</p></div>
    <div className="role-copy"><p>{roleIntroduction}</p>{roleSections.map(section => <section key={section.title}><h2>{section.title}</h2><ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div>
    <ApplicationForm/>
  </article></main></SiteShell>;
}
