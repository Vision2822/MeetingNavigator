import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HomePage } from "./components/home-page";
import { LearnMorePage } from "./components/learn-more-page";
import { AuthPage } from "./components/auth-page";
import { OtpVerification } from "./components/otp-verification";
import { UsernameSetup } from "./components/username-setup";
import { DisclaimerPage } from "./components/disclaimer-page";
import { SurveyPage } from "./components/survey-page";
import { ResultsPage } from "./components/results-page";
import { ForgotPassword } from "./components/forgot-password";
import { Dashboard } from "./components/dashboard";
import { UserHome } from "./components/user-home";
import { ProfilePage } from "./components/profile-page";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "./components/ui/alert-dialog";

// Helper functions for survey completion tracking
const markSurveyCompleted = (email: string, score: number) => {
  try {
    const surveys = localStorage.getItem('neurotracker_surveys') || '{}';
    const surveyData = JSON.parse(surveys);
    surveyData[email] = {
      completed: true,
      score: score,
      date: new Date().toISOString()
    };
    localStorage.setItem('neurotracker_surveys', JSON.stringify(surveyData));
  } catch (error) {
    console.error('Error saving survey data:', error);
  }
};

const hasSurveyCompleted = (email: string): boolean => {
  try {
    const surveys = localStorage.getItem('neurotracker_surveys') || '{}';
    const surveyData = JSON.parse(surveys);
    return surveyData[email]?.completed === true;
  } catch {
    return false;
  }
};

const getSurveyData = (email: string) => {
  try {
    const surveys = localStorage.getItem('neurotracker_surveys') || '{}';
    const surveyData = JSON.parse(surveys);
    return surveyData[email];
  } catch {
    return null;
  }
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<"landing" | "learn-more" | "auth" | "otp" | "username" | "disclaimer" | "survey" | "results" | "forgot-password" | "dashboard" | "user-home" | "profile">("landing");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [surveyScore, setSurveyScore] = useState(0);
  const [showSurveyAlert, setShowSurveyAlert] = useState(false);

  const handleSignUp = (email: string, phone: string) => {
    setUserEmail(email);
    setUserPhone(phone);
    setCurrentStep("otp");
  };

  const handleLogin = (email: string, hasSurvey: boolean) => {
    setUserEmail(email);
    
    // Retrieve user data from localStorage
    const users = JSON.parse(localStorage.getItem('neurotracker_users') || '[]');
    const user = users.find((u: any) => u.email === email);
    
    if (user) {
      setUserPhone(user.phone);
      setUserName(user.name || "User");
    } else {
      setUserName("User");
    }
    
    // Check if user has already completed the survey
    if (hasSurveyCompleted(email)) {
      const surveyData = getSurveyData(email);
      if (surveyData) {
        setSurveyScore(surveyData.score);
      }
      setShowSurveyAlert(true);
    } else {
      setCurrentStep("disclaimer");
    }
  };

  const handleForgotPassword = () => {
    setCurrentStep("forgot-password");
  };

  const handleOtpVerified = () => {
    setCurrentStep("username");
  };

  const handleUsernameComplete = (username: string) => {
    setUserName(username);
    setCurrentStep("disclaimer");
  };

  const handleDisclaimerAccept = () => {
    setCurrentStep("survey");
  };

  const handleSurveyComplete = (score: number) => {
    setSurveyScore(score);
    markSurveyCompleted(userEmail, score);
    setCurrentStep("results");
  };

  const handleRestart = () => {
    setCurrentStep("disclaimer");
  };

  const handleBack = () => {
    setCurrentStep("auth");
  };

  const handleContinue = () => {
    setCurrentStep("user-home");
  };

  const handleAlertClose = () => {
    setShowSurveyAlert(false);
    setCurrentStep("user-home");
  };

  const handleHome = () => {
    setCurrentStep("user-home");
  };

  const handleGetStarted = () => {
    setCurrentStep("auth");
  };

  const handleLearnMore = () => {
    setCurrentStep("learn-more");
  };

  const handleBackToLanding = () => {
    setCurrentStep("landing");
  };

  const handleToolClick = (toolName: string) => {
    console.log("Tool clicked:", toolName);
    // TODO: Navigate to specific tool page
  };

  const handleViewDashboard = () => {
    setCurrentStep("dashboard");
  };

  const handleViewProfile = () => {
    setCurrentStep("profile");
  };

  const handleUpdateProfile = (updates: { userName?: string; userEmail?: string; fullName?: string }) => {
    if (updates.userName) {
      setUserName(updates.userName);
    }
    if (updates.userEmail) {
      setUserEmail(updates.userEmail);
    }
    // Store full name in localStorage or state as needed
    if (updates.fullName) {
      localStorage.setItem(`neurotracker_fullname_${userEmail}`, updates.fullName);
    }
  };

  const handleLogout = () => {
    setUserEmail("");
    setUserName("");
    setSurveyScore(0);
    setCurrentStep("landing");
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500">
      <AnimatePresence mode="wait">
        {currentStep === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <HomePage onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} />
          </motion.div>
        )}
        {currentStep === "learn-more" && (
          <motion.div
            key="learn-more"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <LearnMorePage onBack={handleBackToLanding} onGetStarted={handleGetStarted} />
          </motion.div>
        )}
        {currentStep === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AuthPage 
              onSignUp={handleSignUp} 
              onLogin={handleLogin} 
              onForgotPassword={handleForgotPassword}
              onHome={handleBackToLanding}
            />
          </motion.div>
        )}
        {currentStep === "forgot-password" && (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <ForgotPassword onBack={handleBack} />
          </motion.div>
        )}
        {currentStep === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <OtpVerification 
              email={userEmail} 
              phone={userPhone} 
              onVerify={handleOtpVerified}
              onBack={handleBack}
            />
          </motion.div>
        )}
        {currentStep === "username" && (
          <motion.div
            key="username"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <UsernameSetup onComplete={handleUsernameComplete} />
          </motion.div>
        )}
        {currentStep === "disclaimer" && (
          <motion.div
            key="disclaimer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <DisclaimerPage userName={userName} onAccept={handleDisclaimerAccept} />
          </motion.div>
        )}
        {currentStep === "survey" && (
          <motion.div
            key="survey"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <SurveyPage userName={userName} onComplete={handleSurveyComplete} />
          </motion.div>
        )}
        {currentStep === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsPage score={surveyScore} userName={userName} onContinue={handleContinue} />
          </motion.div>
        )}
        {showSurveyAlert && (
          <AlertDialog open={showSurveyAlert} onOpenChange={setShowSurveyAlert}>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl">Survey Already Completed</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="text-base space-y-3 pt-2 text-muted-foreground">
                    <div>
                      You have already completed the ADHD assessment survey on{" "}
                      <span className="font-semibold">
                        {getSurveyData(userEmail)?.date 
                          ? new Date(getSurveyData(userEmail).date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })
                          : 'a previous date'}
                      </span>.
                    </div>
                    <div className="font-semibold text-foreground">
                      Your score: {surveyScore} out of 24
                    </div>
                    <div className="text-destructive">
                      ⚠️ This assessment cannot be retaken. Your results are final and cannot be changed.
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleAlertClose}>
                  Continue to Home
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {currentStep === "user-home" && (
          <motion.div
            key="user-home"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <UserHome 
              userName={userName}
              userEmail={userEmail}
              onToolClick={handleToolClick}
              onViewDashboard={handleViewDashboard}
              onViewProfile={handleViewProfile}
              onLogout={handleLogout}
            />
          </motion.div>
        )}
        {currentStep === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <Dashboard 
              userName={userName} 
              score={surveyScore} 
              userEmail={userEmail}
              completionDate={getSurveyData(userEmail)?.date}
              onHome={handleHome}
            />
          </motion.div>
        )}
        {currentStep === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <ProfilePage 
              userName={userName} 
              userEmail={userEmail}
              userPhone={userPhone}
              onHome={handleHome}
              onUpdateProfile={handleUpdateProfile}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}