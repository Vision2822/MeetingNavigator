import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { CheckCircle, AlertCircle, AlertTriangle, XCircle } from "lucide-react";

interface ResultsPageProps {
  score: number;
  userName?: string;
  onRestart?: () => void;
  onContinue?: () => void;
}

export function ResultsPage({ score, userName, onRestart, onContinue }: ResultsPageProps) {
  const getScoreInterpretation = (score: number) => {
    if (score >= 0 && score <= 9) {
      return {
        range: "Low Negative",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        borderColor: "border-green-200 dark:border-green-800",
        icon: CheckCircle,
        iconColor: "text-green-600 dark:text-green-400",
        message: "A score in this range indicates that you reported a very low frequency of ADHD-related symptoms. Based on this screener, your responses do not suggest the presence of ADHD."
      };
    } else if (score >= 10 && score <= 13) {
      return {
        range: "High Negative",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
        borderColor: "border-blue-200 dark:border-blue-800",
        icon: AlertCircle,
        iconColor: "text-blue-600 dark:text-blue-400",
        message: "A score in this range is still considered \"negative\" for a positive screen. However, it indicates that you do experience some symptoms of inattention or hyperactivity/impulsivity. While this score does not meet the threshold for a positive screen, if these symptoms interfere with your daily life or work, you may still find it helpful to discuss them with a healthcare professional."
      };
    } else if (score >= 14 && score <= 17) {
      return {
        range: "Low Positive Range",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/30",
        borderColor: "border-orange-200 dark:border-orange-800",
        icon: AlertTriangle,
        iconColor: "text-orange-600 dark:text-orange-400",
        message: "This score is in the \"low positive\" range and meets the threshold for a positive screen. This result suggests that the symptoms you reported are consistent with an ADHD diagnosis in adults. It is not a diagnosis, but it is a strong indicator that further investigation by a qualified healthcare professional is warranted to determine if a formal diagnosis is appropriate and to discuss potential support."
      };
    } else {
      return {
        range: "High Positive Range",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/30",
        borderColor: "border-red-200 dark:border-red-800",
        icon: XCircle,
        iconColor: "text-red-600 dark:text-red-400",
        message: "This score is in the \"high positive\" range, strongly suggesting the presence of symptoms that are highly consistent with adult ADHD. This result indicates a significant number or frequency of symptoms. It is strongly recommended that you share this result with a qualified healthcare professional for a comprehensive evaluation to confirm a potential diagnosis and discuss a plan for support."
      };
    }
  };

  const interpretation = getScoreInterpretation(score);
  const Icon = interpretation.icon;

  return (
    <div className="w-full max-w-3xl p-4">
      <Card className="border-4">
        <CardHeader className="space-y-1">
          <div className="text-center mb-4">
            <h1 className="tracking-wider text-[40px] font-[Bungee_Inline]">NEUROTRACKER</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-[24px] not-italic">Assessment Results</CardTitle>
              <CardDescription>
                {userName ? `${userName}, here are your results` : "Here are your assessment results"}
              </CardDescription>
            </div>
            <ThemeToggle />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-8"
          >
            <div className="inline-flex flex-col items-center gap-4">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Icon className={`h-16 w-16 ${interpretation.iconColor}`} />
              </motion.div>
              <div>
                <p className="text-muted-foreground mb-2">Your Score</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 10,
                    delay: 0.3 
                  }}
                  className="text-6xl"
                >
                  {score}
                </motion.p>
                <p className="text-muted-foreground mt-1">out of 24</p>
              </div>
            </div>
          </motion.div>

          {/* Score Range */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`p-4 rounded-lg border-2 ${interpretation.bgColor} ${interpretation.borderColor}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon className={`h-6 w-6 ${interpretation.iconColor}`} />
              <h3 className={`text-xl ${interpretation.color}`}>
                Score: {score >= 0 && score <= 9 ? "0–9" : score >= 10 && score <= 13 ? "10–13" : score >= 14 && score <= 17 ? "14–17" : "18–24"} ({interpretation.range})
              </h3>
            </div>
            <p className="leading-relaxed text-foreground/90">
              {interpretation.message}
            </p>
          </motion.div>

          {/* Important Note */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="p-4 rounded-lg bg-muted"
          >
            <h4 className="mb-2">Important Note</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This screener is not a diagnostic tool. Only a qualified healthcare professional can diagnose ADHD. 
              If you have concerns about ADHD symptoms, please consult with a doctor, psychiatrist, or psychologist 
              who specializes in ADHD assessment.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex gap-3 pt-4"
          >
            {onContinue && (
              <Button onClick={onContinue} className="w-full">
                Go to Dashboard
              </Button>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}