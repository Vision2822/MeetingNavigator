import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Mail, Lock, User, Phone, Home } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { toast } from "sonner";

interface AuthPageProps {
  onSignUp: (email: string, phone: string) => void;
  onLogin: (email: string, hasSurvey: boolean) => void;
  onForgotPassword: () => void;
  onHome?: () => void;
}

// Helper functions for validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
};

// Storage helpers
const getStoredUsers = () => {
  try {
    const users = localStorage.getItem('neurotracker_users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const storeUser = (email: string, password: string, phone: string, name: string) => {
  const users = getStoredUsers();
  users.push({ email, password, phone, name });
  localStorage.setItem('neurotracker_users', JSON.stringify(users));
};

const findUser = (email: string) => {
  const users = getStoredUsers();
  return users.find((user: any) => user.email === email);
};

export function AuthPage({ onSignUp, onLogin, onForgotPassword, onHome }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate email format
    if (!validateEmail(email)) {
      setLoginError("Please enter a valid email address");
      setIsLoading(false);
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if user exists
    const user = findUser(email);
    if (!user) {
      setLoginError("No account found with this email. Please sign up first.");
      setIsLoading(false);
      toast.error("No account found. Please sign up first.");
      return;
    }

    // Check password
    if (user.password !== password) {
      setLoginError("Incorrect password. Please try again.");
      setIsLoading(false);
      toast.error("Incorrect password");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      onLogin(email, false);
    }, 1000);
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError("");
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const name = formData.get("name") as string;

    // Validate email
    if (!validateEmail(email)) {
      setSignupError("Please enter a valid email address");
      setIsLoading(false);
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number (10 digits only)
    if (!validatePhone(phone)) {
      setSignupError("Phone number must be exactly 10 digits");
      setIsLoading(false);
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      setIsLoading(false);
      toast.error("Passwords do not match");
      return;
    }

    // Check if user already exists
    const existingUser = findUser(email);
    if (existingUser) {
      setSignupError("An account with this email already exists. Please log in.");
      setIsLoading(false);
      toast.error("Account already exists. Please log in.");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // Store user credentials
      storeUser(email, password, phone, name);
      setIsLoading(false);
      toast.success("Account created successfully!");
      onSignUp(email, phone);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl p-4">
      <Card className="w-full relative border-4 mx-[0px] my-[16px] px-[83px] py-[0px]">
        <CardHeader className="space-y-1 pb-[16px] pt-[24px] pr-[24px] pl-[15px]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="tracking-wider text-[24px] font-[Bungee_Inline] text-center">NEUROTRACKER</h1>
            <ThemeToggle />
          </div>
          <div className="flex flex-col items-start">
            <CardTitle className="text-[20px] sm:text-[24px] not-italic">Welcome</CardTitle>
            <CardDescription className="text-sm break-words text-[11px] font-bold">
              Sign in to your account or create a new one
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-0">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 text-[16px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 text-[20px]"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 h-auto text-sm"
                    onClick={onForgotPassword}
                  >
                    Forgot password?
                  </Button>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                {loginError && <p className="text-sm text-destructive mt-2">{loginError}</p>}
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="mt-0">
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 text-[16px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 text-[16px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone" className="text-sm">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="pl-10 text-[16px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 text-[16px] text-[15px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-sm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm-password"
                      name="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 text-[16px]"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                {signupError && <p className="text-sm text-destructive mt-2">{signupError}</p>}
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Home Button */}
      {onHome && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={onHome}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}