import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-16">
      <div className="text-center px-4">
        <p className="font-body text-sm font-semibold text-primary tracking-wider uppercase mb-3">404 Error</p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">Page not found</h1>
        <p className="font-body text-base text-muted-foreground mb-8 max-w-sm mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-semibold px-6 py-3 rounded-full hover:brightness-105 transition-all"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
