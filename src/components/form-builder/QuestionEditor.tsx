import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";
import type { Question } from "@/pages/FormBuilder";

interface QuestionEditorProps {
  question: Question;
  onUpdateQuestion: (question: Question) => void;
}

export const QuestionEditor = ({ question, onUpdateQuestion }: QuestionEditorProps) => {
  const [localQuestion, setLocalQuestion] = useState(question);

  const updateField = (field: string, value: any) => {
    const updated = { ...localQuestion, [field]: value };
    setLocalQuestion(updated);
    onUpdateQuestion(updated);
  };

  const updateContent = (contentField: string, value: any) => {
    const updated = {
      ...localQuestion,
      content: { ...localQuestion.content, [contentField]: value }
    };
    setLocalQuestion(updated);
    onUpdateQuestion(updated);
  };

  const renderCategorizeEditor = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="items">Items to Categorize</Label>
        <div className="space-y-2 mt-2">
          {(localQuestion.content.items || []).map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) => {
                  const newItems = [...(localQuestion.content.items || [])];
                  newItems[index] = e.target.value;
                  updateContent('items', newItems);
                }}
                placeholder="Item to categorize"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newItems = (localQuestion.content.items || []).filter((_: any, i: number) => i !== index);
                  updateContent('items', newItems);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={() => {
              const newItems = [...(localQuestion.content.items || []), ''];
              updateContent('items', newItems);
            }}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="categories">Categories</Label>
        <div className="space-y-2 mt-2">
          {(localQuestion.content.categories || []).map((category: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={category}
                onChange={(e) => {
                  const newCategories = [...(localQuestion.content.categories || [])];
                  newCategories[index] = e.target.value;
                  updateContent('categories', newCategories);
                }}
                placeholder="Category name"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newCategories = (localQuestion.content.categories || []).filter((_: any, i: number) => i !== index);
                  updateContent('categories', newCategories);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={() => {
              const newCategories = [...(localQuestion.content.categories || []), ''];
              updateContent('categories', newCategories);
            }}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCloseEditor = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="text">Text with Blanks (use {`{{answer}}`} for blanks)</Label>
        <Textarea
          value={localQuestion.content.text || ''}
          onChange={(e) => updateContent('text', e.target.value)}
          placeholder="Enter text with {{blanks}} where answers should go"
          rows={4}
        />
      </div>
      
      <div>
        <Label>Possible Answers</Label>
        <div className="space-y-2 mt-2">
          {(localQuestion.content.blanks || []).map((blank: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={blank}
                onChange={(e) => {
                  const newBlanks = [...(localQuestion.content.blanks || [])];
                  newBlanks[index] = e.target.value;
                  updateContent('blanks', newBlanks);
                }}
                placeholder="Answer option"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newBlanks = (localQuestion.content.blanks || []).filter((_: any, i: number) => i !== index);
                  updateContent('blanks', newBlanks);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={() => {
              const newBlanks = [...(localQuestion.content.blanks || []), ''];
              updateContent('blanks', newBlanks);
            }}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Answer
          </Button>
        </div>
      </div>
    </div>
  );

  const renderComprehensionEditor = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="passage">Reading Passage</Label>
        <Textarea
          value={localQuestion.content.passage || ''}
          onChange={(e) => updateContent('passage', e.target.value)}
          placeholder="Enter the reading passage here..."
          rows={6}
        />
      </div>

      <div>
        <Label>Follow-up Questions</Label>
        <div className="space-y-4 mt-2">
          {(localQuestion.content.questions || []).map((q: any, index: number) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <GripVertical className="w-5 h-5 text-muted-foreground mt-2" />
                  <div className="flex-1 space-y-3">
                    <Input
                      value={q.question || ''}
                      onChange={(e) => {
                        const newQuestions = [...(localQuestion.content.questions || [])];
                        newQuestions[index] = { ...q, question: e.target.value };
                        updateContent('questions', newQuestions);
                      }}
                      placeholder="Question text"
                    />
                    
                    <select
                      value={q.type || 'multiple-choice'}
                      onChange={(e) => {
                        const newQuestions = [...(localQuestion.content.questions || [])];
                        newQuestions[index] = { ...q, type: e.target.value };
                        updateContent('questions', newQuestions);
                      }}
                      className="w-full p-2 rounded-md border border-input bg-background"
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="short-answer">Short Answer</option>
                    </select>

                    {q.type === 'multiple-choice' && (
                      <div className="space-y-2">
                        {(q.options || []).map((option: string, optIndex: number) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newQuestions = [...(localQuestion.content.questions || [])];
                                const newOptions = [...(q.options || [])];
                                newOptions[optIndex] = e.target.value;
                                newQuestions[index] = { ...q, options: newOptions };
                                updateContent('questions', newQuestions);
                              }}
                              placeholder={`Option ${optIndex + 1}`}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newQuestions = [...(localQuestion.content.questions || [])];
                                const newOptions = (q.options || []).filter((_: any, i: number) => i !== optIndex);
                                newQuestions[index] = { ...q, options: newOptions };
                                updateContent('questions', newQuestions);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newQuestions = [...(localQuestion.content.questions || [])];
                            const newOptions = [...(q.options || []), ''];
                            newQuestions[index] = { ...q, options: newOptions };
                            updateContent('questions', newQuestions);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Option
                        </Button>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newQuestions = (localQuestion.content.questions || []).filter((_: any, i: number) => i !== index);
                      updateContent('questions', newQuestions);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="ghost"
            onClick={() => {
              const newQuestions = [...(localQuestion.content.questions || []), {
                id: Date.now().toString(),
                question: '',
                type: 'multiple-choice',
                options: ['']
              }];
              updateContent('questions', newQuestions);
            }}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
            </span>
            Question Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Question Title</Label>
            <Input
              id="title"
              value={localQuestion.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter question title"
              className="mt-2"
            />
          </div>

          {question.type === 'categorize' && renderCategorizeEditor()}
          {question.type === 'cloze' && renderCloseEditor()}
          {question.type === 'comprehension' && renderComprehensionEditor()}
        </CardContent>
      </Card>
    </motion.div>
  );
};