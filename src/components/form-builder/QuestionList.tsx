import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2, Edit } from "lucide-react";
import type { Question } from "@/pages/FormBuilder";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuestionListProps {
  questions: Question[];
  selectedQuestion: Question | null;
  onSelectQuestion: (question: Question) => void;
  onReorderQuestions: (questions: Question[]) => void;
  onDeleteQuestion: (questionId: string) => void;
}

interface SortableQuestionItemProps {
  question: Question;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const SortableQuestionItem = ({ question, isSelected, onSelect, onDelete }: SortableQuestionItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'categorize':
        return 'bg-blue-500';
      case 'cloze':
        return 'bg-green-500';
      case 'comprehension':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary bg-glass-highlight' : 'hover:bg-glass-highlight'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <button
          {...listeners}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        
        <div className={`w-3 h-3 rounded-full ${getQuestionTypeColor(question.type)}`} />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">
            {question.title || 'Untitled Question'}
          </h4>
          <p className="text-xs text-muted-foreground capitalize">
            {question.type}
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export const QuestionList = ({
  questions,
  selectedQuestion,
  onSelectQuestion,
  onReorderQuestions,
  onDeleteQuestion,
}: QuestionListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);
      
      onReorderQuestions(arrayMove(questions, oldIndex, newIndex));
    }
  };

  if (questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-muted-foreground py-8"
      >
        <p className="text-sm">No questions yet</p>
        <p className="text-xs mt-1">Add your first question to get started</p>
      </motion.div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 group">
          {questions.map((question) => (
            <SortableQuestionItem
              key={question.id}
              question={question}
              isSelected={selectedQuestion?.id === question.id}
              onSelect={() => onSelectQuestion(question)}
              onDelete={() => onDeleteQuestion(question.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};