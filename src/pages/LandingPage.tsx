
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

const LandingPage = () => {
  const { speak } = useAccessibility();
  
  useEffect(() => {
    // Announce the page for screen readers
    const pageTitle = document.title;
    speak(`Welcome to ${pageTitle}, an accessible learning platform. Navigate using voice commands or keyboard shortcuts.`);
  }, [speak]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center py-12 px-4 md:px-8 lg:px-12">
        <div className="md:w-1/2 space-y-4 md:space-y-6 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Learning Made Accessible For Everyone
          </h1>
          <p className="text-lg text-muted-foreground">
            Our platform is designed with accessibility at its core, ensuring that everyone 
            can learn effectively regardless of their abilities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign Up</Link>
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/3] bg-muted rounded-lg overflow-hidden">
            {/* Replace with actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <p className="text-center">
                Image showing diverse students learning together with accessibility tools
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-12 px-4 md:px-8 lg:px-12 bg-muted">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Accessibility Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform includes various accessibility features to ensure an inclusive 
            learning experience for all students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">Voice Commands</h3>
            <p>Navigate the platform using your voice with simple commands like "Open classroom" or "Play video"</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">Text-to-Speech</h3>
            <p>Have the content read aloud to you with our built-in text-to-speech functionality</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">High Contrast Mode</h3>
            <p>Switch to high contrast mode for better readability of text and visual elements</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">Video Captions</h3>
            <p>All videos come with captions that can be turned on or off according to your preference</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">Keyboard Navigation</h3>
            <p>Navigate through the entire platform using just your keyboard for enhanced accessibility</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">Screen Reader Compatibility</h3>
            <p>Fully compatible with popular screen readers to ensure content accessibility</p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join our accessible learning platform today and experience education that's 
          designed for everyone.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">Create Account</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 px-4 md:px-8 lg:px-12 bg-muted text-center">
        <p className="text-muted-foreground">
          © 2025 Learn Access. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
