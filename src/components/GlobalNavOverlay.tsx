import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FLOW_ROUTES, canonicalizePath } from "@/lib/flowRoutes";

const GlobalNavOverlay: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goBack = () => navigate(-1);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {/* Home logo (top-left) */}
      <button
        aria-label="Go to home"
        onClick={goHome}
        className="pointer-events-auto absolute top-4 left-4 md:top-6 md:left-6 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        title="Home"
      >
        <img
          src="/lovable-uploads/a8d760f4-8e0c-410d-ae83-a3e6dd4b23e9.png"
          alt="Home"
          className="h-12 w-12 md:h-14 md:w-14 object-contain"
        />
      </button>

      {/* Back button (bottom-left) */}
      <div className="pointer-events-auto absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <Button variant="secondary" onClick={goBack} aria-label="Go back">
          ← Back
        </Button>
      </div>
    </div>
  );
};

export default GlobalNavOverlay;
