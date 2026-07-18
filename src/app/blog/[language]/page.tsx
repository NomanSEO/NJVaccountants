import { notFound, permanentRedirect } from "next/navigation";
import { getPost } from "@/sanity/lib/queries";
import { blogPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function LegacyBlogPostPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language: legacySlug } = await params;
  const post = await getPost(legacySlug);
  if (!post?.slug?.current) notFound();
  permanentRedirect(blogPath("en", post.slug.current));
}
