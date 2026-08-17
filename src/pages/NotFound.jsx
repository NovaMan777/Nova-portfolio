import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center max-w-md">
        <p className="font-serif text-7xl text-primary italic mb-4">404</p>
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
