import { Badge, type BadgeProps } from "@/components/ui/badge";

const publishedMap: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
  published: { label: "Published", variant: "success" },
  draft: { label: "Draft", variant: "neutral" },
  live: { label: "Live", variant: "success" },
  hidden: { label: "Hidden", variant: "neutral" },
  featured: { label: "Featured", variant: "default" },
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "neutral" },
};

export function PublishedBadge({ published }: { published: boolean }) {
  const meta = published ? publishedMap.published : publishedMap.draft;
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}

export function ActiveBadge({ active }: { active: boolean }) {
  const meta = active ? publishedMap.active : publishedMap.inactive;
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}

export function FeaturedBadge() {
  return <Badge variant="default">Featured</Badge>;
}

const enquiryStatusMap: Record<string, BadgeProps["variant"]> = {
  NEW: "default",
  CONTACTED: "warning",
  QUALIFIED: "warning",
  PROPOSAL: "outline",
  WON: "success",
  LOST: "destructive",
  ARCHIVED: "neutral",
};

export function EnquiryStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={enquiryStatusMap[status] ?? "neutral"}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}
