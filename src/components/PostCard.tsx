"use client";

import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { WelkBadge, WelkCard } from "@welkui/react";
import type { WP_REST_API_Post } from "wp-types";

interface PostCardProps {
  post: WP_REST_API_Post;
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const title = post.title.rendered.replace(/<[^>]+>/g, "");
  const dateLabel = format(parseISO(post.date), "MMM d, yyyy");

  return (
    <WelkCard
      title={title}
      subtitle={
        <div>
          <div
            className="post-excerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          <div className="post-card-meta">
            <WelkBadge size="sm" variant="info">
              {dateLabel}
            </WelkBadge>
          </div>
        </div>
      }
      onClick={() => router.push(`/blog/${post.slug}`)}
      aria-label={`Read post: ${title}`}
    />
  );
}
