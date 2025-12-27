import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center animate-fade-in">
        <h1 className="text-8xl font-display font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 gradient-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
