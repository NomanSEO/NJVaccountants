import { notFound, permanentRedirect } from "next/navigation";
import { getPost } from "@/sanity/lib/queries";
import { blogPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function LegacyBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post?.slug?.current) notFound();
  permanentRedirect(blogPath("en", post.slug.current));
}
