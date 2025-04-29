
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { users, courses } from "@/data/mockData";
import { BookOpen, Clock, Award } from "lucide-react";

const DashboardPage = () => {
  // For demo purposes, we'll use the first user
  const user = users[0];
  const enrolledCourses = courses.filter(course => 
    user.enrolledCourses?.includes(course.id)
  );
  
  const { speak } = useAccessibility();
  
  useEffect(() => {
    // Announce the page for screen readers
    speak("Dashboard page loaded. You can view your enrolled courses and progress here.");
  }, [speak]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}!
          </p>
        </div>
        <Button asChild>
          <Link to="/courses">Browse All Courses</Link>
        </Button>
      </div>

      <h2 className="text-xl font-semibold">Your Enrolled Courses</h2>
      
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map(course => (
            <Card key={course.id}>
              <CardHeader>
                <div className="w-full h-32 bg-muted rounded-md mb-2 relative overflow-hidden">
                  {/* Course image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>
                  Instructor: {course.instructor}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{course.duration}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "25%" }}></div>
                </div>
                
                <Button className="w-full" asChild>
                  <Link to={`/course/${course.id}`}>Continue Learning</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
          <Button className="mt-4" asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      )}
      
      <h2 className="text-xl font-semibold mt-8">Your Learning Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{enrolledCourses.length}</span>
              </div>
              <span className="text-sm text-muted-foreground">Enrolled</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Learning Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">3.5</span>
              </div>
              <span className="text-sm text-muted-foreground">Hours this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">2</span>
              </div>
              <span className="text-sm text-muted-foreground">Badges earned</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
