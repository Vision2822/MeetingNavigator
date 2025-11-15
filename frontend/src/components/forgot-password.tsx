import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { toast } from "sonner";

interface ForgotPasswordProps {
  onBack: () => void;
}

// Helper functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getStoredUsers = () => {
  try {
    const users = localStorage.getItem('neurotracker_users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const findUserIndex = (email: string) => {
  const users = getStoredUsers();
  return users.findIndex((user: any) => user.email === email);
};

const updateUserPassword = (email: string, newPassword: string) => {
  const users = getStoredUsers();
  const userIndex = findUserIndex(email);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem('neurotracker_users', JSON.stringify(users));
    return true;
  }
  return false;
};

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get('email') as string;

    // Validate email format
    if (!validateEmail(emailValue)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      toast.error('Please enter a valid email address');
      return;
    }

    // Check if user exists
    const userIndex = findUserIndex(emailValue);
    if (userIndex === -1) {
      setError('No account found with this email');
      setIsLoading(false);
      toast.error('No account found with this email');
      return;
    }

    // Simulate sending reset code
    setTimeout(() => {
      setIsLoading(false);
      setEmail(emailValue);
      setStep('reset');
      toast.success('Verification successful! You can now reset your password.');
    }, 1000);
  };

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      toast.error('Passwords do not match');
      return;
    }

    // Check password length
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Update password
    setTimeout(() => {
      const success = updateUserPassword(email, newPassword);
      setIsLoading(false);
      
      if (success) {
        toast.success('Password reset successful!');
        onBack();
      } else {
        setError('Failed to reset password. Please try again.');
        toast.error('Failed to reset password');
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-4">
      <Card className="w-full relative border-4">
        <CardHeader className="space-y-1 pb-[16px] pt-[24px] pr-[24px] pl-[15px]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="tracking-wider text-[24px] font-[Bungee_Inline] text-center">NEUROTRACKER</h1>
            <ThemeToggle />
          </div>
          <div className="flex flex-col items-start">
            <CardTitle className="text-[20px] sm:text-[24px] not-italic">
              {step === 'email' ? 'Forgot Password' : 'Reset Password'}
            </CardTitle>
            <CardDescription className="text-sm break-words text-[11px] font-bold">
              {step === 'email' 
                ? 'Enter your email to reset your password'
                : 'Enter your new password'
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Continue'}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    name="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('email')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
