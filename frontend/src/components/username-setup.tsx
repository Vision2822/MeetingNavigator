import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { User, Check, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface UsernameSetupProps {
  onComplete: (username: string) => void;
}

export function UsernameSetup({ onComplete }: UsernameSetupProps) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkUsername = (value: string) => {
    if (value.length < 3) {
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    // Simulate API call to check username availability
    setTimeout(() => {
      // Mock: usernames starting with 'admin' are taken
      setIsAvailable(!value.toLowerCase().startsWith("admin"));
      setIsChecking(false);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(value);
    checkUsername(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAvailable || username.length < 3) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onComplete(username);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-4">
      <Card className="w-full border-4">
        <CardHeader className="space-y-1">
          <div className="text-center mb-4">
            <h1 className="tracking-wider text-[32px] sm:text-[40px] font-[Bungee_Inline] break-words">NEUROTRACKER</h1>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-[20px] sm:text-[24px] not-italic">Create Your Username</CardTitle>
              <CardDescription className="text-sm break-words">
                Choose a unique username for your account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  className="pl-10 pr-10"
                  value={username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={20}
                />
                {isChecking && (
                  <div className="absolute right-3 top-3">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                  </div>
                )}
                {!isChecking && isAvailable === true && username.length >= 3 && (
                  <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                )}
                {!isChecking && isAvailable === false && username.length >= 3 && (
                  <X className="absolute right-3 top-3 h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground break-words">
                  Username must be 3-20 characters long and can only contain letters, numbers, and underscores.
                </p>
                {isAvailable === false && username.length >= 3 && (
                  <p className="text-xs text-red-500">
                    This username is already taken. Please try another one.
                  </p>
                )}
                {isAvailable === true && username.length >= 3 && (
                  <p className="text-xs text-green-500">
                    This username is available!
                  </p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !isAvailable || username.length < 3}
            >
              {isLoading ? "Setting up..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}