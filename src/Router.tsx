import { useState, useEffect, useCallback } from "react";
import type { ReactNode, MouseEvent } from "react";
import Landing from "./pages/Landing";
import About from "./pages/About";
import App from "./App";

function usePath() {
  const [path, setPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return path;
}

export function navigate(to: string) {
  if (window.location.pathname === to) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

export function Link({
  to,
  children,
  className,
  ariaLabel,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      navigate(to);
    },
    [to]
  );

  return (
    <a href={to} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

export default function Router() {
  const path = usePath();

  if (path === "/about") return <About />;
  if (path === "/app" || path.startsWith("/app/")) return <App />;
  return <Landing />;
}
