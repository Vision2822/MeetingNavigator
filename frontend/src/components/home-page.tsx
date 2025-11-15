import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Brain, Menu, Eye, Mic, Volume2, FileText, Calendar as CalendarIcon, TrendingUp } from "lucide-react";

interface HomePageProps {
  onGetStarted: () => void;
  onLearnMore?: () => void;
}

export function HomePage({ onGetStarted, onLearnMore }: HomePageProps) {
  // Feature list with appropriate icons
  const features = [
    { id: 1, name: "Attention Tracker", icon: Eye },
    { id: 2, name: "Live Speech to Text", icon: Mic },
    { id: 3, name: "Live Text to Speech", icon: Volume2 },
    { id: 4, name: "Meeting Summaries", icon: FileText },
    { id: 5, name: "Calendar", icon: CalendarIcon },
    { id: 6, name: "Progress Tracker", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Header/Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="tracking-wider font-[Bungee_Inline] text-[20px]">NEUROTRACKER</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl tracking-tight">
            Every tool you need for ADHD assessment
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive assessment tools designed to help you understand and track ADHD symptoms with ease and accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={onGetStarted} className="text-lg px-8">
              Get Started
            </Button>
            {onLearnMore && (
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={onLearnMore}>
                Learn More
              </Button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl mb-4">
            All the tools you need
          </h3>
          <p className="text-lg text-muted-foreground">
            Everything in one place for comprehensive ADHD assessment
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50">
                  <CardContent className="p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                    <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="font-medium text-lg font-[Cambay]">
                      {feature.name}
                    </h4>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 py-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-4 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-12 text-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-[Days_One]">
                Ready to get started?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take the first step towards understanding your ADHD symptoms with our comprehensive assessment tools.
              </p>
              <Button size="lg" onClick={onGetStarted} className="text-lg px-12">
                Begin Assessment
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}