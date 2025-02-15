import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { BookOpenCheck } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '@/types';
import axios from 'axios';

require('dotenv').config();
const BACKEND_URL = process.env.BACKEND_URL;



const DEMO_CREDENTIALS = {
  username: 'teacher',
  password: 'password123',
  name: 'John Doe',
};

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        onLogin(response.data);
        toast.success('Login successful!', {
          description: 'You are now logged in.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials', {
        description: 'Please check your username and password.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-background">
      <Card className="w-full max-w-md animate-slide-in bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 animate-float shadow-lg">
            <BookOpenCheck className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Welcome to Quizo
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to manage your quizzes
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="transition-all duration-200 hover:border-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-200 hover:border-primary focus:border-primary"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-center mb-2 text-blue-600">Demo Credentials</p>
            <p className="text-sm text-muted-foreground">
              Username: {DEMO_CREDENTIALS.username}<br />
              Password: {DEMO_CREDENTIALS.password}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}