import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ArrowLeft, Mail, Phone, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface OtpVerificationProps {
  email: string;
  phone: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OtpVerification({ email, phone, onVerify, onBack }: OtpVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpSentDialog, setShowOtpSentDialog] = useState(true);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  // Show toast notification when component mounts
  useEffect(() => {
    toast.success("OTP codes sent successfully!", {
      description: `Verification codes have been sent to ${maskEmail(email)} and ${maskPhone(phone)}`,
      duration: 5000,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onVerify();
    }, 1500);
  };

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    if (!name || !domain) return email;
    if (name.length <= 2) return `${name}@${domain}`;
    return `${name.substring(0, 2)}${"*".repeat(name.length - 2)}@${domain}`;
  };

  const maskPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length <= 4) return phone;
    return `${"*".repeat(digits.length - 4)}${digits.slice(-4)}`;
  };

  return (
    <div className="w-full max-w-md p-4">
      <Card className="w-full border-4">
        <CardHeader className="space-y-1">
          <div className="text-center mb-4">
            <h1 className="tracking-wider font-[Bungee_Inline] break-words text-[24px] text-center">NEUROTRACKER</h1>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-[20px] sm:text-[24px] not-italic">Verification</CardTitle>
              <CardDescription className="text-sm break-words">
                Enter the codes sent to your email and phone
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm break-all">Code sent to {maskEmail(email)}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-otp">Email OTP</Label>
                <Input
                  id="email-otp"
                  name="email-otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  required
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm break-all">Code sent to {maskPhone(phone)}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-otp">Phone OTP</Label>
                <Input
                  id="phone-otp"
                  name="phone-otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  required
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
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
                {isLoading ? "Verifying..." : "Verify Account"}
              </Button>
            </div>

            <div className="text-center">
              <Button type="button" variant="link" className="text-sm h-auto">
                Didn't receive codes? Resend
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* OTP Sent Notification Dialog */}
      <AlertDialog open={showOtpSentDialog} onOpenChange={setShowOtpSentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <AlertDialogTitle className="text-center text-xl">
                OTP Codes Sent Successfully!
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription asChild>
              <div className="space-y-4 pt-2 text-center">
                <div className="text-base">
                  Verification codes have been sent to:
                </div>
                <div className="space-y-3 bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="font-medium">{maskEmail(email)}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-medium">{maskPhone(phone)}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Please check your email inbox and phone messages. The codes will expire in 10 minutes.
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowOtpSentDialog(false)} className="w-full">
              Got it, Continue
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}