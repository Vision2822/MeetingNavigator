import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { AlertCircle, CheckCircle, AlertTriangle, XCircle, Shield, Calendar, TrendingUp, Home } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { toast } from "sonner";

interface DashboardProps {
  userName?: string;
  score: number;
  userEmail: string;
  completionDate?: string;
  onHome?: () => void;
}

export function Dashboard({ userName, score, userEmail, completionDate, onHome }: DashboardProps) {
  const getScoreInterpretation = (score: number) => {
    if (score >= 0 && score <= 9) {
      return {
        range: "Low Negative",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        borderColor: "border-green-200 dark:border-green-800",
        icon: CheckCircle,
        iconColor: "text-green-600 dark:text-green-400",
      };
    } else if (score >= 10 && score <= 13) {
      return {
        range: "High Negative",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
        borderColor: "border-blue-200 dark:border-blue-800",
        icon: AlertCircle,
        iconColor: "text-blue-600 dark:text-blue-400",
      };
    } else if (score >= 14 && score <= 17) {
      return {
        range: "Low Positive Range",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/30",
        borderColor: "border-orange-200 dark:border-orange-800",
        icon: AlertTriangle,
        iconColor: "text-orange-600 dark:text-orange-400",
      };
    } else {
      return {
        range: "High Positive Range",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/30",
        borderColor: "border-red-200 dark:border-red-800",
        icon: XCircle,
        iconColor: "text-red-600 dark:text-red-400",
      };
    }
  };

  const interpretation = getScoreInterpretation(score);
  const Icon = interpretation.icon;

  const formattedDate = completionDate 
    ? new Date(completionDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Unknown';

  const handleHomeClick = () => {
    if (onHome) {
      onHome();
    }
  };

  return (
    <div className="w-full max-w-5xl p-4">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="tracking-wider text-[32px] font-[Bungee_Inline] mb-2">NEUROTRACKER</h1>
                  <CardTitle className="text-[20px] not-italic">
                    Welcome back, {userName || "User"}
                  </CardTitle>
                  <CardDescription>
                    Your ADHD Assessment Dashboard
                  </CardDescription>
                </div>
                <ThemeToggle />
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Disclaimer Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="border-2 border-destructive/50 bg-destructive/5">
            <Shield className="h-5 w-5 text-destructive" />
            <AlertTitle className="text-destructive">Important: Results are Final</AlertTitle>
            <AlertDescription className="text-foreground/90">
              Your assessment results have been recorded and <span className="font-semibold">cannot be changed or retaken</span>. 
              This ensures the integrity of the screening process. The assessment can only be completed once per account. 
              If you believe there was an error, please consult with a healthcare professional.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Assessment Results Summary */}
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Your Score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl">{score}</span>
                  <span className="text-muted-foreground">/24</span>
                </div>
                <p className={`text-sm mt-2 ${interpretation.color}`}>
                  {interpretation.range}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Assessment Date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{formattedDate}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Completed
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${interpretation.iconColor}`} />
                  Status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Assessment Complete</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Results finalized
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-4">
            <CardHeader>
              <CardTitle>Assessment Results</CardTitle>
              <CardDescription>
                Detailed breakdown of your ADHD screening
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-6 rounded-lg border-2 ${interpretation.bgColor} ${interpretation.borderColor}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`h-8 w-8 ${interpretation.iconColor}`} />
                  <div>
                    <h3 className={`text-xl ${interpretation.color}`}>
                      {interpretation.range}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Score Range: {score >= 0 && score <= 9 ? "0–9" : score >= 10 && score <= 13 ? "10–13" : score >= 14 && score <= 17 ? "14–17" : "18–24"}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 text-foreground/90">
                  <p className="leading-relaxed">
                    {score >= 0 && score <= 9 && "A score in this range indicates that you reported a very low frequency of ADHD-related symptoms. Based on this screener, your responses do not suggest the presence of ADHD."}
                    {score >= 10 && score <= 13 && "A score in this range is still considered \"negative\" for a positive screen. However, it indicates that you do experience some symptoms of inattention or hyperactivity/impulsivity. While this score does not meet the threshold for a positive screen, if these symptoms interfere with your daily life or work, you may still find it helpful to discuss them with a healthcare professional."}
                    {score >= 14 && score <= 17 && "This score is in the \"low positive\" range and meets the threshold for a positive screen. This result suggests that the symptoms you reported are consistent with an ADHD diagnosis in adults. It is not a diagnosis, but it is a strong indicator that further investigation by a qualified healthcare professional is warranted to determine if a formal diagnosis is appropriate and to discuss potential support."}
                    {score >= 18 && "This score is in the \"high positive\" range, strongly suggesting the presence of symptoms that are highly consistent with adult ADHD. This result indicates a significant number or frequency of symptoms. It is strongly recommended that you share this result with a qualified healthcare professional for a comprehensive evaluation to confirm a potential diagnosis and discuss a plan for support."}
                  </p>
                </div>
              </div>

              {/* Important Note */}
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Important Note
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This screener is not a diagnostic tool. Only a qualified healthcare professional can diagnose ADHD. 
                  If you have concerns about ADHD symptoms, please consult with a doctor, psychiatrist, or psychologist 
                  who specializes in ADHD assessment.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Recommended actions based on your assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium">Save or Print Your Results</p>
                  <p className="text-sm text-muted-foreground">
                    Keep a record of your assessment results for future reference.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium">Consult a Healthcare Professional</p>
                  <p className="text-sm text-muted-foreground">
                    Share these results with a qualified healthcare provider for proper diagnosis and guidance.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium">Track Your Symptoms</p>
                  <p className="text-sm text-muted-foreground">
                    Monitor how your symptoms affect daily activities and discuss patterns with your healthcare provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Home</CardTitle>
              <CardDescription>
                You are currently viewing your assessment dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={handleHomeClick}
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Home Page
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}