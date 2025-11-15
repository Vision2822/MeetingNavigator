import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ThemeToggle } from "./theme-toggle";
import { Brain, ArrowLeft, User, Mail, Phone, UserCircle, Lock } from "lucide-react";
import { toast } from "sonner";

interface ProfilePageProps {
  userName: string;
  userEmail: string;
  userPhone: string;
  onHome: () => void;
  onUpdateProfile: (updates: ProfileUpdates) => void;
}

interface ProfileUpdates {
  userName?: string;
  userEmail?: string;
  fullName?: string;
  phoneNumber?: string;
}

export function ProfilePage({ userName, userEmail, userPhone, onHome, onUpdateProfile }: ProfilePageProps) {
  // Form values - always editable
  const [fullName, setFullName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState(userPhone);
  const [newUsername, setNewUsername] = useState(userName);
  const [newEmail, setNewEmail] = useState(userEmail);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Remove any non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length === 10;
  };

  const handleSavePersonalInfo = () => {
    if (fullName.trim().length < 2) {
      toast.error("Full name must be at least 2 characters");
      return;
    }
    if (phoneNumber && !validatePhone(phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    onUpdateProfile({ fullName, phoneNumber });
    toast.success("Personal information updated successfully");
  };

  const handleChangeEmail = () => {
    if (!validateEmail(newEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    onUpdateProfile({ userEmail: newEmail });
    toast.success("Email updated successfully");
  };

  const handleChangeUsername = () => {
    if (newUsername.trim().length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }
    onUpdateProfile({ userName: newUsername });
    toast.success("Username updated successfully");
  };

  const handleUpdatePassword = () => {
    if (currentPassword.trim().length < 6) {
      toast.error("Current password must be at least 6 characters");
      return;
    }
    if (newPassword.trim().length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    
    // Verify current password against stored password
    try {
      const users = JSON.parse(localStorage.getItem('neurotracker_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === userEmail);
      
      if (userIndex === -1) {
        toast.error("User not found");
        return;
      }
      
      if (users[userIndex].password !== currentPassword) {
        toast.error("Current password is incorrect");
        return;
      }
      
      // Update password in localStorage
      users[userIndex].password = newPassword;
      localStorage.setItem('neurotracker_users', JSON.stringify(users));
      
      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Error updating password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="tracking-wider font-[Bungee_Inline] text-[20px]">NEUROTRACKER</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl py-12 px-[26px] px-[204px] py-[48px]">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button variant="ghost" onClick={onHome} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl mb-2">Profile Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and personal information
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="bg-muted/50"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={handleSavePersonalInfo}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Address
                </CardTitle>
                <CardDescription>Manage your email address for account notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="john.doe@example.com"
                      className="bg-muted/50"
                    />
                    <Button variant="outline" onClick={handleChangeEmail}>
                      Change
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Username
                </CardTitle>
                <CardDescription>Your unique username for the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="flex gap-2">
                    <Input
                      id="username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="johndoe"
                      className="bg-muted/50"
                    />
                    <Button variant="outline" onClick={handleChangeUsername}>
                      Change
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Password
                </CardTitle>
                <CardDescription>Change your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="bg-muted/50"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={handleUpdatePassword}>
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}