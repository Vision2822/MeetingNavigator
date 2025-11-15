import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ThemeToggle } from "./theme-toggle";
import { AlertTriangle } from "lucide-react";

interface DisclaimerPageProps {
  userName?: string;
  onAccept: () => void;
}

export function DisclaimerPage({ userName, onAccept }: DisclaimerPageProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="w-full max-w-3xl p-4">
      <Card className="border-4">
        <CardHeader className="space-y-1">
          <div className="text-center mb-4">
            <h1 className="tracking-wider text-[40px] font-[Bungee_Inline]">NEUROTRACKER</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-[24px] not-italic">
                {userName ? `Welcome, ${userName}!` : "Before You Begin"}
              </CardTitle>
              <CardDescription>
                Please read the following disclaimer carefully
              </CardDescription>
            </div>
            <ThemeToggle />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Disclaimer Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-lg bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h3 className="text-amber-900 dark:text-amber-100">
                  Important Disclaimer
                </h3>
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                  This tool is an informational screener, not a diagnostic test. The results are not a medical 
                  diagnosis and do not confirm or rule out the presence of ADHD. These results are for personal 
                  reflection and informational purposes only.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4>About This Assessment</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>This screening tool contains 6 questions about symptoms related to ADHD in adults.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Your responses will be scored and interpreted based on clinical screening guidelines.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Only a qualified healthcare professional can provide an official ADHD diagnosis.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span>If you have concerns about ADHD symptoms, please consult with a doctor or mental health professional.</span>
              </li>
            </ul>
          </motion.div>

          {/* Privacy Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-4 rounded-lg bg-muted"
          >
            <h4 className="mb-2">Privacy</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your responses are for your personal use only. This assessment does not collect, store, 
              or share your answers with any third parties.
            </p>
          </motion.div>

          {/* Acceptance Checkbox */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border"
          >
            <Checkbox 
              id="accept-disclaimer" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
            />
            <Label 
              htmlFor="accept-disclaimer" 
              className="cursor-pointer leading-relaxed"
            >
              I understand that this is a screening tool and not a medical diagnosis. I agree to proceed with 
              the assessment for informational purposes only.
            </Label>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pt-4"
          >
            <Button 
              onClick={onAccept}
              disabled={!accepted}
              className="w-full"
              size="lg"
            >
              Continue to Assessment
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}