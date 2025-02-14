import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { User } from '@/types';
import { toast } from 'sonner';

interface CreateEditQuizProps {
  quizId: string;
  onClose: () => void;
  user: User;
}

export function CreateEditQuiz({ quizId, onClose}: CreateEditQuizProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const isEditing = quizId !== 'new';

  useEffect(() => {
    if (isEditing) {
      // Mock fetch quiz data - replace with actual API call
      const quiz = {
        id: '1',
        title: 'Introduction to React',
        description: 'Basic concepts of React including components, props, and state.',
        createdAt: '2024-03-20T10:00:00Z',
      };
      setTitle(quiz.title);
      setDescription(quiz.description);
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error('Validation Error', {
        description: 'Please fill in all required fields.',
      });
      return;
    }

    // Mock save quiz - replace with actual API call
    toast.success(isEditing ? 'Quiz updated successfully!' : 'Quiz created successfully!');
    onClose();
  };

  return (
    <div className="min-h-screen gradient-background">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="gap-2 hover:bg-blue-50 transition-colors animate-slide-in"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEditing
                  ? 'Update your quiz details'
                  : 'Create a new quiz for your students'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-primary focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter quiz description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[150px] bg-white/90 backdrop-blur-sm transition-all duration-200 hover:border-primary focus:border-primary"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="hover:bg-blue-50 transition-colors"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
            >
              {isEditing ? 'Update Quiz' : 'Create Quiz'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}