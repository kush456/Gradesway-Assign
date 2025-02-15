import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, MoreVertical, PencilIcon, Trash2Icon, LogOut } from 'lucide-react';
import { User, Quiz } from '@/types';
import { format, isValid, parseISO } from 'date-fns';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

console.log(BACKEND_URL)

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onEditQuiz: (quizId: string) => void;
}

export function Dashboard({ user, onLogout, onEditQuiz }: DashboardProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/quizzes`)
      .then(response => {
        setQuizzes(response.data);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
      });
  }, []);

  const handleDeleteQuiz = (quizId: string) => {
    axios.delete(`${BACKEND_URL}/quizzes/${quizId}`)
      .then(() => {
        setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
      })
      .catch(error => {
        console.error('Error deleting quiz:', error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col gradient-background">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="animate-slide-in">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Welcome, {user.name}
            </h1>
            <p className="text-sm text-muted-foreground">Manage your quizzes</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => onEditQuiz('new')} 
              className="text-white gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity animate-slide-in"
              style={{ animationDelay: '0.1s' }}
            >
              <Plus className="w-4 h-4" />
              Create Quiz
            </Button>
            <Button 
              variant="outline" 
              onClick={onLogout} 
              className=" gap-2 border-blue-200 hover:bg-blue-50 transition-colors animate-slide-in"
              style={{ animationDelay: '0.2s' }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz, index) => {
            const createdAt = quiz.createdAt ? parseISO(quiz.createdAt) : null;
            const formattedDate = createdAt && isValid(createdAt) ? format(createdAt, 'MMM d, yyyy') : 'Date not available';

            return (
              <Card 
                key={quiz.id} 
                className="relative bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold hover:text-blue-600 transition-colors">
                      {quiz.title}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="animate-slide-in">
                        <DropdownMenuItem 
                          onClick={() => onEditQuiz(quiz.id)}
                          className="hover:bg-blue-50 transition-colors"
                        >
                          <PencilIcon className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="text-destructive hover:bg-red-50 transition-colors"
                        >
                          <Trash2Icon className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{quiz.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Created on {formattedDate}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}