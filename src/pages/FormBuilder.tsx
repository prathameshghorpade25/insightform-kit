import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Save, Settings } from "lucide-react";
import { QuestionEditor } from "@/components/form-builder/QuestionEditor";
import { QuestionList } from "@/components/form-builder/QuestionList";
import { FormSettings } from "@/components/form-builder/FormSettings";
import { useToast } from "@/hooks/use-toast";

export interface Question {
  id: string;
  type: 'categorize' | 'cloze' | 'comprehension';
  title: string;
  content: any;
  order: number;
}

export interface FormData {
  id: string;
  title: string;
  description?: string;
  headerImage?: string;
  questions: Question[];
  settings: {
    theme: string;
    showProgressBar: boolean;
    allowBack: boolean;
  };
}

const FormBuilder = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    id: "1",
    title: "New Form",
    description: "Form description",
    questions: [],
    settings: {
      theme: "default",
      showProgressBar: true,
      allowBack: true,
    },
  });

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: `New ${type} question`,
      content: {},
      order: formData.questions.length,
    };
    
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    
    setSelectedQuestion(newQuestion);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    }));
  };

  const deleteQuestion = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
    }));
    setSelectedQuestion(null);
  };

  const reorderQuestions = (questions: Question[]) => {
    setFormData(prev => ({
      ...prev,
      questions: questions.map((q, index) => ({ ...q, order: index })),
    }));
  };

  const saveForm = () => {
    // Save to backend/localStorage
    toast({
      title: "Form saved successfully!",
      description: "Your form has been saved and is ready to share.",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Question List */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-80 glass border-r border-glass-border p-6"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{formData.title}</h2>
          <p className="text-muted-foreground">{formData.questions.length} questions</p>
        </div>

        <div className="space-y-3 mb-6">
          <Button
            onClick={() => addQuestion('categorize')}
            variant="glass"
            className="w-full justify-start"
          >
            <Plus className="w-4 h-4 mr-2" />
            Categorize Question
          </Button>
          <Button
            onClick={() => addQuestion('cloze')}
            variant="glass"
            className="w-full justify-start"
          >
            <Plus className="w-4 h-4 mr-2" />
            Cloze Question
          </Button>
          <Button
            onClick={() => addQuestion('comprehension')}
            variant="glass"
            className="w-full justify-start"
          >
            <Plus className="w-4 h-4 mr-2" />
            Comprehension
          </Button>
        </div>

        <QuestionList
          questions={formData.questions}
          selectedQuestion={selectedQuestion}
          onSelectQuestion={setSelectedQuestion}
          onReorderQuestions={reorderQuestions}
          onDeleteQuestion={deleteQuestion}
        />
      </motion.div>

      {/* Main Content - Question Editor */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          className="glass border-b border-glass-border p-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Form Builder</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="default" size="sm" onClick={saveForm}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 flex">
          <div className="flex-1 p-6">
            {selectedQuestion ? (
              <QuestionEditor
                question={selectedQuestion}
                onUpdateQuestion={updateQuestion}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6">
                    <Plus className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Start Building</h3>
                  <p className="text-muted-foreground mb-6">
                    Select a question type to get started
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={() => addQuestion('categorize')} variant="gradient">
                      Add Categorize
                    </Button>
                    <Button onClick={() => addQuestion('cloze')} variant="secondary">
                      Add Cloze
                    </Button>
                    <Button onClick={() => addQuestion('comprehension')} variant="accent">
                      Add Comprehension
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - Settings */}
          {showSettings && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="w-80 glass border-l border-glass-border p-6"
            >
              <FormSettings
                settings={formData.settings}
                onUpdateSettings={(settings) =>
                  setFormData(prev => ({ ...prev, settings }))
                }
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;