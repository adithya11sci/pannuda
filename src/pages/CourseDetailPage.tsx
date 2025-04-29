
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { courses } from "@/data/mockData";
import AccessibleVideoPlayer from "@/components/AccessibleVideoPlayer";
import { ArrowLeft } from "lucide-react";
import useVoiceCommands from "@/hooks/useVoiceCommands";
import { Link } from "react-router-dom";

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams] = useSearchParams();
  const unitParam = searchParams.get('unit');
  const unitId = unitParam ? parseInt(unitParam) : 1;
  
  const [activeUnit, setActiveUnit] = useState(unitId);
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  
  const { toast } = useToast();
  const { speak, captionsEnabled, textToSpeech } = useAccessibility();
  
  const course = courses.find(c => c.id === courseId);
  
  useEffect(() => {
    if (course) {
      // Announce the page for screen readers
      speak(`Course page loaded. ${course.title}. ${course.description}`);
    }
  }, [course, speak]);
  
  useEffect(() => {
    // Update active unit when URL param changes
    setActiveUnit(unitId);
    setActiveContentIndex(0);
  }, [unitId]);
  
  // Voice commands are handled by our hook
  useVoiceCommands();
  
  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }
  
  const currentUnit = course.units.find(unit => unit.id === activeUnit) || course.units[0];
  const currentContent = currentUnit.content[activeContentIndex];
  
  const handleEnroll = () => {
    toast({
      title: "Enrolled",
      description: `You have successfully enrolled in ${course.title}`,
    });
  };
  
  const handleContentClick = (index: number) => {
    setActiveContentIndex(index);
  };
  
  // Function to render content based on type
  const renderContent = () => {
    if (!currentContent) return null;
    
    switch (currentContent.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <AccessibleVideoPlayer 
              src={currentContent.content} 
              title={currentContent.title}
              caption={currentContent.videoCaption}
            />
            <div>
              <h3 className="text-lg font-medium mb-2">{currentContent.title}</h3>
              <p className="text-muted-foreground">{currentContent.description}</p>
              {currentContent.duration && (
                <Badge variant="outline" className="mt-2">Duration: {currentContent.duration}</Badge>
              )}
            </div>
          </div>
        );
        
      case 'reading':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{currentContent.title}</h3>
            <p className="text-muted-foreground mb-4">{currentContent.description}</p>
            <div className="prose max-w-none">
              {/* Simple markdown-like rendering */}
              {currentContent.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) {
                  return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold mt-4 mb-2">{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-bold mt-3 mb-1">{line.substring(4)}</h3>;
                } else if (line === '') {
                  return <br key={i} />;
                } else {
                  return <p key={i} className="mb-2">{line}</p>;
                }
              })}
            </div>
            <div className="text-center mt-6">
              {textToSpeech && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => speak(currentContent.content.replace(/[#*]/g, ''))}
                >
                  Read Aloud
                </Button>
              )}
            </div>
          </div>
        );
        
      case 'quiz':
        try {
          const quizData = JSON.parse(currentContent.content);
          return (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{currentContent.title}</h3>
              <p className="text-muted-foreground mb-4">{currentContent.description}</p>
              
              {quizData.questions.map((q: any, i: number) => (
                <div key={i} className="space-y-3 border rounded-lg p-4">
                  <h4 className="font-medium">Question {i + 1}: {q.question}</h4>
                  <div className="space-y-2">
                    {q.options.map((option: string, j: number) => (
                      <div key={j} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`q${i}-o${j}`} 
                          name={`question-${i}`} 
                          className="mr-2"
                        />
                        <label htmlFor={`q${i}-o${j}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="text-center">
                <Button>Submit Quiz</Button>
              </div>
            </div>
          );
        } catch (error) {
          console.error("Error parsing quiz data:", error);
          return <p>Error loading quiz</p>;
        }
        
      default:
        return <p>Content type not supported</p>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <Link to="/courses" className="mr-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">
              Instructor: {course.instructor}
            </p>
          </div>
        </div>
        <Button onClick={handleEnroll}>Enroll in Course</Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Course sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{course.category}</span>
                </div>
              </CardContent>
            </Card>
            
            <Tabs 
              defaultValue={activeUnit.toString()} 
              value={activeUnit.toString()}
              onValueChange={(value) => setActiveUnit(parseInt(value))}
            >
              <TabsList className="w-full">
                {course.units.map(unit => (
                  <TabsTrigger 
                    key={unit.id} 
                    value={unit.id.toString()}
                    className="flex-1"
                  >
                    Unit {unit.id}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {course.units.map(unit => (
                <TabsContent key={unit.id} value={unit.id.toString()} className="mt-4 space-y-2">
                  <p className="font-medium">{unit.title}</p>
                  <p className="text-sm text-muted-foreground mb-4">{unit.description}</p>
                  
                  <div className="space-y-2">
                    {unit.content.map((content, index) => (
                      <Button 
                        key={content.id}
                        variant={index === activeContentIndex && unit.id === activeUnit ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-2 px-3"
                        onClick={() => handleContentClick(index)}
                      >
                        <div className="flex items-center gap-2">
                          {/* Icon based on content type could go here */}
                          <div className="flex-grow truncate">
                            <p className="text-sm font-medium truncate">{content.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                              {content.duration ? ` • ${content.duration}` : ''}
                            </p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-grow">
          <Card>
            <CardHeader>
              <CardTitle>{currentUnit.title}</CardTitle>
              <CardDescription>{currentUnit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
