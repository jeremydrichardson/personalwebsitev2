"use client";

import "./webawesome/register";

export function BlogBackButton() {
  return (
    <div className="blog-back">
      <wa-button href="/" appearance="plain" variant="neutral" size="small">
        <wa-icon slot="start" name="arrow-left" />
        Go Back
      </wa-button>
    </div>
  );
}
