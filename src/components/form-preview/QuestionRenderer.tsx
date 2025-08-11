import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface Question {
  id: string;
  type: 'categorize' | 'cloze' | 'comprehension';
  title: string;
  content: any;
}

interface QuestionRendererProps {
  question: Question;
  answer?: any;
  onAnswerChange: (answer: any) => void;
}

export const QuestionRenderer = ({ question, answer, onAnswerChange }: QuestionRendererProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const renderCategorizeQuestion = () => {
    const { items = [], categories = [] } = question.content;
    const currentAnswer = answer || {};

    const handleDragStart = (item: string) => {
      setDraggedItem(item);
    };

    const handleDrop = (category: string) => {
      if (draggedItem) {
        const newAnswer = { ...currentAnswer };
        
        // Remove item from all categories first
        categories.forEach((cat: string) => {
          if (newAnswer[cat]) {
            newAnswer[cat] = newAnswer[cat].filter((item: string) => item !== draggedItem);
          }
        });
        
        // Add to new category
        if (!newAnswer[category]) {
          newAnswer[category] = [];
        }
        newAnswer[category].push(draggedItem);
        
        onAnswerChange(newAnswer);
        setDraggedItem(null);
      }
    };

    const getUnassignedItems = () => {
      const assignedItems = new Set();
      categories.forEach((cat: string) => {
        if (currentAnswer[cat]) {
          currentAnswer[cat].forEach((item: string) => assignedItems.add(item));
        }
      });
      return items.filter((item: string) => !assignedItems.has(item));
    };

    return (
      <div className="space-y-6">
        {/* Unassigned Items */}
        <div className="glass rounded-lg p-4">
          <h4 className="font-medium mb-3">Items to Categorize</h4>
          <div className="flex flex-wrap gap-2">
            {getUnassignedItems().map((item: string, index: number) => (
              <motion.div
                key={index}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="bg-gradient-brand text-white px-3 py-2 rounded-lg cursor-move hover:shadow-glow transition-all"
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category: string, index: number) => (
            <motion.div
              key={index}
              className="glass rounded-lg p-4 min-h-[120px] border-2 border-dashed border-glass-border hover:border-primary transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(category)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-medium mb-3 text-center">{category}</h4>
              <div className="space-y-2">
                {(currentAnswer[category] || []).map((item: string, itemIndex: number) => (
                  <div
                    key={itemIndex}
                    className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderClozeQuestion = () => {
    const { text = '', blanks = [] } = question.content;
    const currentAnswer = answer || {};

    const renderTextWithBlanks = () => {
      const regex = /\{\{([^}]+)\}\}/g;
      const parts = text.split(regex);
      let blankIndex = 0;

      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is a blank
          const blankKey = `blank_${blankIndex}`;
          blankIndex++;
          
          return (
            <span key={index} className="inline-block mx-1">
              <select
                value={currentAnswer[blankKey] || ''}
                onChange={(e) => onAnswerChange({
                  ...currentAnswer,
                  [blankKey]: e.target.value
                })}
                className="bg-background border border-input rounded px-2 py-1 text-sm min-w-[100px]"
              >
                <option value="">Select...</option>
                {blanks.map((blank: string, blankIdx: number) => (
                  <option key={blankIdx} value={blank}>{blank}</option>
                ))}
              </select>
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      });
    };

    return (
      <div className="space-y-6">
        <div className="glass rounded-lg p-6">
          <div className="text-lg leading-relaxed">
            {renderTextWithBlanks()}
          </div>
        </div>
      </div>
    );
  };

  const renderComprehensionQuestion = () => {
    const { passage = '', questions = [] } = question.content;
    const currentAnswer = answer || {};

    return (
      <div className="space-y-6">
        {/* Passage */}
        <div className="glass rounded-lg p-6">
          <h4 className="font-medium mb-4">Reading Passage</h4>
          <div className="text-muted-foreground leading-relaxed">
            {passage}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q: any, index: number) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h5 className="font-medium mb-4">{q.question}</h5>
                
                {q.type === 'multiple-choice' ? (
                  <div className="space-y-3">
                    {(q.options || []).map((option: string, optIndex: number) => (
                      <label
                        key={optIndex}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name={`question_${q.id}`}
                          value={option}
                          checked={currentAnswer[q.id] === option}
                          onChange={(e) => onAnswerChange({
                            ...currentAnswer,
                            [q.id]: e.target.value
                          })}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="group-hover:text-primary transition-colors">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <Textarea
                    value={currentAnswer[q.id] || ''}
                    onChange={(e) => onAnswerChange({
                      ...currentAnswer,
                      [q.id]: e.target.value
                    })}
                    placeholder="Enter your answer..."
                    rows={3}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {question.type === 'categorize' && renderCategorizeQuestion()}
      {question.type === 'cloze' && renderClozeQuestion()}
      {question.type === 'comprehension' && renderComprehensionQuestion()}
    </motion.div>
  );
};