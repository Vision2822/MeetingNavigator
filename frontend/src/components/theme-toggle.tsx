import { useEffect, useState } from "react";
import { Sun, Moon, Eye } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Theme = "light" | "dark" | "colorblind";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "colorblind");
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "colorblind"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={cycleTheme}
            className="h-9 w-9 rounded-full underline not-italic font-bold text-[13px]"
          >
            {theme === "light" && <Sun className="h-4 w-4" />}
            {theme === "dark" && <Moon className="h-4 w-4" />}
            {theme === "colorblind" && <Eye className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[250px]">
          <p className="font-medium">
            {theme === "light" && "Light Mode"}
            {theme === "dark" && "Dark Mode"}
            {theme === "colorblind" && "Color-Safe Mode"}
          </p>
          {theme === "colorblind" && (
            <p className="text-xs text-muted-foreground mt-1">
              Optimized for red-green color blindness (Deuteranopia/Protanopia)
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}