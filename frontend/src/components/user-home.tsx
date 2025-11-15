import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { ThemeToggle } from "./theme-toggle";
import { Brain, Eye, Mic, Volume2, FileText, Calendar as CalendarIcon, TrendingUp, User, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface UserHomeProps {
  userName: string;
  userEmail: string;
  onToolClick: (toolName: string) => void;
  onViewDashboard: () => void;
  onViewProfile: () => void;
  onLogout: () => void;
}

export function UserHome({ userName, userEmail, onToolClick, onViewDashboard, onViewProfile, onLogout }: UserHomeProps) {
  const tools = [
    { id: 1, name: "Attention Tracker", icon: Eye, description: "Track your focus and attention patterns" },
    { id: 2, name: "Live Speech to Text", icon: Mic, description: "Convert speech to text in real-time" },
    { id: 3, name: "Live Text to Speech", icon: Volume2, description: "Convert text to speech instantly" },
    { id: 4, name: "Meeting Summaries", icon: FileText, description: "Get AI-powered meeting summaries" },
    { id: 5, name: "Calendar", icon: CalendarIcon, description: "Manage your schedule effectively" },
    { id: 6, name: "Progress Tracker", icon: TrendingUp, description: "Monitor your progress over time" },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="tracking-wider font-[Bungee_Inline] text-[20px]">NEUROTRACKER</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onViewDashboard}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onViewProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-2">
            Hello, {userName}
          </h2>
          <p className="text-xl text-muted-foreground">
            Welcome to your homepage
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Card 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50 h-full"
                  onClick={() => onToolClick(tool.name)}
                >
                  <CardContent className="p-8 flex flex-col items-start justify-between h-full">
                    <div className="w-full">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-medium text-xl mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}