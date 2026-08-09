import { notFound } from "next/navigation";
import { getInsightById, listAllTeam } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { InsightForm } from "@/components/admin/insight-form";

export const metadata = { title: "Edit Insight" };

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [insight, team] = await Promise.all([getInsightById(id), listAllTeam()]);
  if (!insight) notFound();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader title={insight.title} description="Update the article and its publishing state." />
      <InsightForm
        insight={{
          id: insight.id,
          title: insight.title,
          slug: insight.slug,
          excerpt: insight.excerpt,
          content: insight.content,
          category: insight.category,
          featuredImage: insight.featuredImage,
          authorId: insight.authorId,
          featured: insight.featured,
          published: insight.published,
          publishedAt: insight.publishedAt,
        }}
        authors={team.map((t) => ({ id: t.id, name: t.name, role: t.role }))}
      />
    </div>
  );
}
