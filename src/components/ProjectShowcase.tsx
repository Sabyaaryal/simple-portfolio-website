
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckSquare, 
  Cloud, 
  Shield, 
  Calculator, 
  Search, 
  Timer,
  Code,
  Database,
  Globe
} from "lucide-react";
import TodoApp from "./TodoApp";
import WeatherDashboard from "./WeatherDashboard";
import PasswordGenerator from "./PasswordGenerator";

interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  technologies: string[];
  icon: any;
  component: React.ComponentType;
}

const projects: Project[] = [
  {
    id: "todo",
    title: "Todo Application",
    description: "A full-featured todo app with local storage, CRUD operations, and responsive design. Demonstrates state management and data persistence.",
    type: "Frontend",
    technologies: ["React", "TypeScript", "LocalStorage", "Tailwind CSS"],
    icon: CheckSquare,
    component: TodoApp,
  },
  {
    id: "weather",
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with location search, current conditions, and 5-day forecast. Shows API integration patterns.",
    type: "Frontend",
    technologies: ["React", "API Integration", "Responsive Design"],
    icon: Cloud,
    component: WeatherDashboard,
  },
  {
    id: "password",
    title: "Password Generator",
    description: "Secure password generator with customizable options, strength indicator, and security best practices.",
    type: "Security Tool",
    technologies: ["React", "Security", "Cryptography Concepts"],
    icon: Shield,
    component: PasswordGenerator,
  },
];

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<string>("todo");
  
  const currentProject = projects.find(p => p.id === selectedProject);
  const CurrentComponent = currentProject?.component || TodoApp;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Project Portfolio</h1>
          <p className="text-xl text-muted-foreground">
            Showcase of Different Programming Projects & Technologies
          </p>
        </div>

        {/* Project Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Available Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {projects.map((project) => {
                const IconComponent = project.icon;
                return (
                  <Card 
                    key={project.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedProject === project.id 
                        ? "ring-2 ring-primary bg-accent/50" 
                        : ""
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1">{project.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {project.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Technologies Used */}
            {currentProject && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Technologies & Concepts:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Project Display */}
        <div className="bg-card rounded-lg border p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{currentProject?.title}</h2>
            <p className="text-muted-foreground">{currentProject?.description}</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-background">
            <CurrentComponent />
          </div>
        </div>

        {/* Future Projects Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Coming Soon - More Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <Calculator className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Calculator App</p>
                  <p className="text-xs text-muted-foreground">Advanced calculator with history</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <Search className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Web Scraper</p>
                  <p className="text-xs text-muted-foreground">Python data extraction tool</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <Timer className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Pomodoro Timer</p>
                  <p className="text-xs text-muted-foreground">Productivity tracking app</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <Database className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">REST API</p>
                  <p className="text-xs text-muted-foreground">Backend service with database</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">File Organizer</p>
                  <p className="text-xs text-muted-foreground">Automated file management</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <Code className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">CLI Tools</p>
                  <p className="text-xs text-muted-foreground">Command-line utilities</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectShowcase;
