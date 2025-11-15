import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { ThemeToggle } from "./theme-toggle";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface SurveyPageProps {
  userName?: string;
  onComplete: (totalScore: number) => void;
}

export function SurveyPage({ userName, onComplete }: SurveyPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const questions = [
    "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
    "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    "How often do you have problems remembering appointments or obligations?",
    "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    "How often do you feel overly active and compelled to do things, like you were driven by a motor?"
  ];

  const scaleLabels = ["Never", "Rarely", "Sometimes", "Often", "Always"];

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    console.log("Survey answers:", answers);
    console.log("Total score:", totalScore);
    onComplete(totalScore);
  };

  const currentAnswer = answers[currentQuestion];
  const isAnswered = currentAnswer !== undefined;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

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
                {userName ? `Welcome, ${userName}!` : "Assessment"}
              </CardTitle>
              <CardDescription>
                Please answer the following questions honestly
              </CardDescription>
            </div>
            <ThemeToggle />
          </div>
          
          {/* Progress Bar */}
          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Question */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              className="space-y-6"
            >
              <Label className="text-lg leading-relaxed block">
                {questions[currentQuestion]}
              </Label>

              {/* Scale Selector */}
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-3">
                  {scaleLabels.map((label, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleAnswer(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
                        ${currentAnswer === index 
                          ? 'border-primary bg-primary text-primary-foreground shadow-md' 
                          : 'border-muted hover:border-primary/50 hover:bg-accent'
                        }
                      `}
                    >
                      <span className="text-sm text-center leading-tight">{label}</span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Scale line visualization */}
                <div className="relative pt-2">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-full" />
                  <div className="absolute top-0 left-0 right-0 flex justify-between">
                    {[0, 1, 2, 3, 4].map((val) => (
                      <motion.div
                        key={val}
                        animate={{
                          scale: currentAnswer === val ? 1.5 : 1,
                          backgroundColor: currentAnswer === val ? 'var(--primary)' : 'var(--muted-foreground)'
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-3 h-3 rounded-full -mt-1 opacity-30"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentQuestion < totalQuestions - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex-1 flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setShowConfirmDialog(true)}
                disabled={!isAnswered}
                className="flex-1"
              >
                Complete Assessment
              </Button>
            )}
          </div>

          {/* Question indicator dots */}
          <div className="flex justify-center gap-2 pt-2">
            {questions.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  width: index === currentQuestion ? 32 : 8,
                  opacity: answers[index] !== undefined ? 1 : 0.3
                }}
                transition={{ duration: 0.3 }}
                className={`
                  h-2 rounded-full
                  ${index === currentQuestion 
                    ? 'bg-primary' 
                    : answers[index] !== undefined
                    ? 'bg-primary/50'
                    : 'bg-muted'
                  }
                `}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <AlertDialogTitle className="text-xl">Confirm Assessment Submission</AlertDialogTitle>
            </div>
            <AlertDialogDescription asChild>
              <div className="space-y-3 pt-2">
                <div className="text-base">
                  <strong className="text-foreground">Important:</strong> Once you submit this assessment, your results will be final.
                </div>
                <div className="space-y-2 text-base pl-5">
                  <div>• Your results <strong className="text-foreground">cannot be changed</strong> after submission</div>
                  <div>• You <strong className="text-foreground">cannot retake</strong> this assessment</div>
                  <div>• This ensures the integrity of the screening process</div>
                </div>
                <div className="text-base pt-2">
                  Are you ready to submit your assessment?
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, Submit Assessment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}