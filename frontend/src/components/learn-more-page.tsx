import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Brain, ArrowLeft, AlertTriangle, Eye, Mic, Volume2, FileText, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface LearnMorePageProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function LearnMorePage({ onBack, onGetStarted }: LearnMorePageProps) {
  const features = [
    {
      icon: Eye,
      title: "Attention Tracker",
      description: "Continuously watches engagement level to then highlight when focus drops, and what triggers distractions."
    },
    {
      icon: Mic,
      title: "Live Speech-to-Text",
      description: "Captures your spoken thoughts immediately; it makes recording ideas, reflections, or symptoms much easier without losing focus."
    },
    {
      icon: Volume2,
      title: "Live Text-to-Speech",
      description: "Facilitates comprehension and organization as it vocalizes what you are writing to provide audio feedback."
    },
    {
      icon: FileText,
      title: "Meeting Summaries",
      description: "Automatically generate concise notes and action items to reduce cognitive overload and support executive function."
    },
    {
      icon: CalendarIcon,
      title: "Calendar",
      description: "Integration keeps your schedule organized and sends you timely reminders, which helps to maintain consistency and manage time well."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracker",
      description: "Visualizes trends in attention, productivity, and task completion, providing you and your clinician the ability to measure real changes over time."
    }
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Header/Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="tracking-wider font-[Bungee_Inline] text-[20px]">NEUROTRACKER</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Brain className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl tracking-tight">
              About Our ADHD Assessment Tools
            </h1>
          </div>

          {/* Main Content Card */}
          <Card className="border-2">
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Comprehensive assessment tools for ADHD are designed to provide a clear, structured way to identify, understand, and follow symptoms over time. These tools bring together evidence-based questionnaires, behavioral checklists, and digital tracking methods that both the individual and clinician can use to obtain an accurate perception of attention, impulsivity, and hyperactivity patterns.
                </p>

                <p>
                  These often involve rating scales that utilize standardized monitoring tools such as the Conners' Rating Scale, Vanderbilt ADHD Diagnostic Rating Scale, or ADHD Self-Report Scale, known by the acronym ASRS. They then provide symptom ratings across settings: at home, in school, and in the workplace. Digital platforms have upgraded these via interactive dashboards and data visualization to more easily track changes and measure progress.
                </p>

                <p>
                  The core purpose of all these tools is to ensure early detection, treatment planning on an individual basis, and continuous monitoring. Systems that integrate professional assessment with self-assessment and real-time monitoring enable informed decisions by both the user and the healthcare provider and enhance daily functioning.
                </p>

                <div className="pt-4">
                  <h3 className="text-xl mb-4 text-foreground">
                    In other words, comprehensive ADHD diagnostic tools allow the user to:
                  </h3>
                  <ul className="space-y-3 list-none">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Understand their symptom patterns in greater detail.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Track progress and identify triggers over time.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Support clinicians by helping them accurately diagnose and optimize treatment.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Enhance self-awareness and active symptom management to improve outcomes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card className="border-2">
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <feature.icon className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-sm">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer Alert */}
          <Alert className="border-2 border-amber-500/50 bg-amber-500/10">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <AlertTitle className="text-amber-900 dark:text-amber-200">Important Disclaimer</AlertTitle>
            <AlertDescription className="text-amber-800 dark:text-amber-300 mt-2">
              <p className="mb-2">
                This tool is designed for screening and informational purposes only to assist individuals experiencing ADHD symptoms and is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                If you suspect you have ADHD or any other medical condition, please consult with a qualified healthcare provider or mental health professional for a comprehensive evaluation and personalized treatment plan.
              </p>
            </AlertDescription>
          </Alert>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" onClick={onGetStarted} className="text-lg px-12">
              Begin Assessment
            </Button>
            <Button size="lg" variant="outline" onClick={onBack} className="text-lg px-12">
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}