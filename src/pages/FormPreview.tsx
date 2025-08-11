import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { QuestionRenderer } from "@/components/form-preview/QuestionRenderer";
import { ProgressBar } from "@/components/form-preview/ProgressBar";

// Mock form data - in real app this would come from API
const mockForm = {
  id: "1",
  title: "Sample Interactive Form",
  description: "A demonstration of unique question types",
  headerImage: null,
  questions: [
    {
      id: "1",
      type: "categorize" as const,
      title: "Categorize Programming Languages",
      content: {
        items: ["JavaScript", "Python", "Java", "HTML"],
        categories: ["Frontend", "Backend", "Markup"]
      }
    },
    {
      id: "2", 
      type: "cloze" as const,
      title: "Complete the Sentence",
      content: {
        text: "React is a {{JavaScript}} library for building {{user interfaces}}.",
        blanks: ["JavaScript", "user interfaces"]
      }
    },
    {
      id: "3",
      type: "comprehension" as const,
      title: "Reading Comprehension",
      content: {
        passage: "Artificial Intelligence (AI) is transforming industries worldwide. From healthcare to finance, AI applications are making processes more efficient and accurate.",
        questions: [
          {
            id: "3a",
            question: "What is AI transforming?",
            type: "multiple-choice",
            options: ["Industries", "Countries", "Languages", "Currencies"]
          },
          {
            id: "3b", 
            question: "Name one benefit of AI mentioned:",
            type: "short-answer"
          }
        ]
      }
    }
  ]
};

const FormPreview = () => {
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = mockForm.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / mockForm.questions.length) * 100;

  const handleNext = () => {
    if (currentQuestionIndex < mockForm.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", answers);
    // Submit to backend
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-8">
            Your responses have been submitted successfully.
          </p>
          <Button onClick={handleSubmit} variant="gradient" size="lg">
            View Results
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center py-8 px-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{mockForm.title}</h1>
        <p className="text-muted-foreground">{mockForm.description}</p>
      </motion.div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass rounded-2xl p-8 md:p-12"
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {currentQuestionIndex + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    of {mockForm.questions.length}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {currentQuestion.title}
                </h2>
              </div>

              <QuestionRenderer
                question={currentQuestion}
                answer={answers[currentQuestion.id]}
                onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center p-6"
      >
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {mockForm.questions.length}
        </div>

        <Button
          variant="gradient"
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          {currentQuestionIndex === mockForm.questions.length - 1 ? "Finish" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default FormPreview;