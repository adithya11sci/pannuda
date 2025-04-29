
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { users, courses } from "@/data/mockData";

const AdminPage = () => {
  const [courseList, setCourseList] = useState(courses);
  const [userList, setUserList] = useState(users);
  const { speak } = useAccessibility();
  
  useEffect(() => {
    // Announce the page for screen readers
    speak("Admin panel loaded. You can manage courses and users here.");
  }, [speak]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage courses, users, and accessibility settings
        </p>
      </div>
      
      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>
                Add, edit, or remove courses from the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Button className="mb-4">Add New Course</Button>
                
                <div className="flex items-center mb-4 space-x-2">
                  <Input placeholder="Search courses..." className="max-w-sm" />
                  <Button variant="secondary">Search</Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseList.map(course => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.enrollmentStatus}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Button className="mb-4">Add New User</Button>
                
                <div className="flex items-center mb-4 space-x-2">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Button variant="secondary">Search</Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userList.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accessibility" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Settings</CardTitle>
              <CardDescription>
                Configure platform-wide accessibility options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Default Accessibility Settings</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="high-contrast-default" 
                        className="h-4 w-4 rounded border-gray-300" 
                      />
                      <Label htmlFor="high-contrast-default">Enable High Contrast by Default</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="tts-default" 
                        className="h-4 w-4 rounded border-gray-300" 
                      />
                      <Label htmlFor="tts-default">Enable Text-to-Speech by Default</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="captions-default" 
                        className="h-4 w-4 rounded border-gray-300" 
                      />
                      <Label htmlFor="captions-default">Enable Video Captions by Default</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="voice-default" 
                        className="h-4 w-4 rounded border-gray-300" 
                      />
                      <Label htmlFor="voice-default">Enable Voice Commands by Default</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tts-voice">Default Text-to-Speech Voice</Label>
                    <select 
                      id="tts-voice"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    >
                      <option>Default (Browser Voice)</option>
                      <option>Male Voice 1</option>
                      <option>Female Voice 1</option>
                      <option>Male Voice 2</option>
                      <option>Female Voice 2</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="font-size">Default Font Size</Label>
                    <select 
                      id="font-size"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    >
                      <option>Normal</option>
                      <option>Large</option>
                      <option>Extra Large</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Accessibility Compliance Reports</Label>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm">Last scan: 2 days ago</p>
                    <p className="text-sm text-muted-foreground">98% WCAG 2.1 AA compliant</p>
                    <Button variant="outline" className="mt-2">View Full Report</Button>
                  </div>
                </div>
                
                <Button>Save Accessibility Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
