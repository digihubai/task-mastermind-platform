
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="rounded-full w-16 h-16 bg-secondary/50 flex items-center justify-center mx-auto">
          <span className="text-2xl font-semibold">404</span>
        </div>
        
        <h1 className="text-3xl font-bold">Page not found</h1>
        
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline transition-all mt-6"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
