import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FLOW_ROUTES, canonicalizePath } from "@/lib/flowRoutes";

const GlobalNavOverlay: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentPath = canonicalizePath(pathname);
  const currentIndex = FLOW_ROUTES.indexOf(currentPath);

  const hasPrev = true; // Always allow going back in history
  const hasNext = currentIndex > -1 && currentIndex < FLOW_ROUTES.length - 1;

  const goHome = () => navigate("/");
  const goBack = () => navigate(-1);
  const goNext = () => {
    if (!hasNext) return;
    const nextPath = FLOW_ROUTES[currentIndex + 1];
    navigate(nextPath);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {/* Home logo (top-left) */}
      <button
        aria-label="Go to home"
        onClick={goHome}
        className="pointer-events-auto absolute top-4 left-4 md:top-6 md:left-6 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        title="Home"
        style={{ width: 56, height: 56 }}
      />

      {/* Back button (bottom-left) */}
      {hasPrev && (
        <div className="pointer-events-auto absolute bottom-4 left-4 md:bottom-6 md:left-6">
          <Button variant="secondary" onClick={goBack} aria-label="Go back">
            ← Back
          </Button>
        </div>
      )}

      {/* Next button (bottom-right) */}
      {currentIndex > -1 && (
        <div className="pointer-events-auto absolute bottom-4 right-4 md:bottom-6 md:right-6">
          <Button onClick={goNext} disabled={!hasNext} aria-label="Next">
            Next →
          </Button>
        </div>
      )}
    </div>
  );
};

export default GlobalNavOverlay;
