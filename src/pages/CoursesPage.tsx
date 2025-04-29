
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { courses } from "@/data/mockData";

const CoursesPage = () => {
  const { speak } = useAccessibility();
  
  useEffect(() => {
    // Announce the page for screen readers
    speak("Courses page loaded. Browse available courses in physics and chemistry.");
  }, [speak]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Browse available courses and start learning!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <div className="w-full aspect-video bg-muted rounded-md mb-2 relative overflow-hidden">
                {/* Course image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground/40 font-medium">{course.category}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <CardTitle>{course.title}</CardTitle>
                <Badge variant={course.enrollmentStatus === 'Open' ? 'default' : 'secondary'}>
                  {course.enrollmentStatus}
                </Badge>
              </div>
              <CardDescription>
                Instructor: {course.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline">{course.duration}</Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to={`/course/${course.id}`}>View Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
