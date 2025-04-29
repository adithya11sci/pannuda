
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

const NotFoundPage = () => {
  const { speak } = useAccessibility();
  
  useEffect(() => {
    speak("Page not found. The page you are looking for does not exist.");
  }, [speak]);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
