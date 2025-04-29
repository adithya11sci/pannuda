
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import useVoiceCommands from "@/hooks/useVoiceCommands";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { 
  Home, 
  BookOpen, 
  Settings, 
  User, 
  LogIn, 
  LogOut,
  Contrast, 
  Speaker, 
  Monitor, 
  Keyboard, 
  Video, 
  Mic,
  Captions
} from "lucide-react";
import AccessibilityPanel from "./AccessibilityPanel";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { listening } = useAccessibility();
  
  useVoiceCommands();

  // Check if user is logged in (for demo purposes)
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Learn Access</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="flex flex-col justify-between">
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a 
                        href="/"
                        className={cn(
                          "flex items-center space-x-2",
                          location.pathname === "/" && "text-primary font-medium"
                        )}
                        aria-current={location.pathname === "/" ? "page" : undefined}
                      >
                        <Home className="h-5 w-5" />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {isLoggedIn ? (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a 
                            href="/dashboard" 
                            className={cn(
                              "flex items-center space-x-2",
                              location.pathname === "/dashboard" && "text-primary font-medium"
                            )}
                            aria-current={location.pathname === "/dashboard" ? "page" : undefined}
                          >
                            <User className="h-5 w-5" />
                            <span>Dashboard</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a 
                            href="/courses"
                            className={cn(
                              "flex items-center space-x-2",
                              location.pathname === "/courses" && "text-primary font-medium"
                            )}
                            aria-current={location.pathname === "/courses" ? "page" : undefined}
                          >
                            <BookOpen className="h-5 w-5" />
                            <span>Courses</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          onClick={handleLogout}
                          className="flex items-center space-x-2"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Log Out</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a 
                          href="/login" 
                          className={cn(
                            "flex items-center space-x-2",
                            location.pathname === "/login" && "text-primary font-medium"
                          )}
                          aria-current={location.pathname === "/login" ? "page" : undefined}
                        >
                          <LogIn className="h-5 w-5" />
                          <span>Login / Sign Up</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {/* Admin link - would normally be conditionally rendered based on user role */}
                  {isLoggedIn && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a 
                          href="/admin" 
                          className={cn(
                            "flex items-center space-x-2",
                            location.pathname === "/admin" && "text-primary font-medium"
                          )}
                          aria-current={location.pathname === "/admin" ? "page" : undefined}
                        >
                          <Settings className="h-5 w-5" />
                          <span>Admin Panel</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <AccessibilityPanel />
          </SidebarFooter>
        </Sidebar>

        <main id="main-content" className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-2 flex items-center justify-between shadow-sm border-b">
            <SidebarTrigger className="ml-2" />
            <div className="flex items-center">
              {/* Voice command indicator */}
              <div className={cn(
                "flex items-center bg-secondary rounded-full px-2 py-1 mr-2",
                listening ? "text-primary" : "text-muted-foreground"
              )}>
                <Mic className="h-4 w-4 mr-1" />
                {listening ? "Listening" : "Voice Off"}
              </div>
            </div>
          </div>
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
