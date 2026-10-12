import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <img
        src="/nova/NOVA_MAN_enhanced_animated_background.svg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/55" />
      <div className="relative z-10 max-w-md text-center">
        <p className="mb-4 font-mono text-7xl text-primary">404</p>
        <h1 className="text-2xl font-semibold mb-3">This page doesn&apos;t exist.</h1>
        <p className="text-muted-foreground mb-8">
          The link may be broken, or the page may have moved.
        </p>
        <Link to="/" className="cosmic-button">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </div>
  );
};
