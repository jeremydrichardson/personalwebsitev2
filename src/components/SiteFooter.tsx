import { WelkBadge } from "@welkui/react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p style={{ margin: 0 }}>
          Built by Jeremy Richardson with{" "}
          <a href="https://ui.welkdock.com/" rel="noreferrer">
            WelkUI
          </a>
          .
        </p>
        <WelkBadge variant="info" size="sm">
          comic mode on
        </WelkBadge>
      </div>
    </footer>
  );
}
