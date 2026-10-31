"use client";

import { useRouter } from "next/navigation";
import { WelkButton } from "@welkui/react";

export function BlogBackButton() {
  const router = useRouter();

  return (
    <div className="blog-back">
      <WelkButton variant="ghost" size="sm" onClick={() => router.push("/")}>
        ← Back home
      </WelkButton>
    </div>
  );
}
