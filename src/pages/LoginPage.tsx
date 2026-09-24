import React, { useState } from 'react';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { FormErrors, LoginFormData, User } from '../types/auth';

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: (user: User) => void;
  users: User[];
  registeredNotification?: string | null;
  onClearNotification?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateToRegister,
  onLoginSuccess,
  users,
  registeredNotification,
  onClearNotification,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    if (generalError) {
      setGeneralError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onClearNotification) onClearNotification();

    if (!validate()) {
      setGeneralError('Please fill in all required fields properly.');
      return;
    }

    setIsLoading(true);
    setGeneralError(null);

    // Simulate snappy network latency for professional feel
    setTimeout(() => {
      setIsLoading(false);
      const normalizedEmail = formData.email.trim().toLowerCase();
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === formData.password
      );

      if (matchedUser) {
        onLoginSuccess(matchedUser);
      } else {
        setGeneralError(
          'Invalid email or password. Please verify your credentials or create a new account.'
        );
      }
    }, 400);
  };

  const handleFillDemo = () => {
    if (users.length > 0) {
      const demoUser = users[0];
      setFormData({
        email: demoUser.email,
        password: demoUser.password || 'password123',
      });
      setErrors({});
      setGeneralError(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Registration success feedback banner */}
      {registeredNotification && (
        <Alert
          type="success"
          message={registeredNotification}
          onClose={onClearNotification}
        />
      )}

      {/* General error banner */}
      {generalError && (
        <Alert
          type="error"
          message={generalError}
          onClose={() => setGeneralError(null)}
        />
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Input */}
        <Input
          id="login-email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          icon={<Mail className="h-4 w-4" />}
          required
        />

        {/* Password Input */}
        <Input
          id="login-password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          icon={<Lock className="h-4 w-4" />}
          required
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            icon={<LogIn className="h-4 w-4" />}
          >
            Sign In
          </Button>
        </div>
      </form>

      {/* Demo Credentials Quick-Fill helper */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleFillDemo}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-600 bg-slate-100/80 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200/60"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Fill Demo Credentials (alex@example.com)</span>
        </button>
      </div>

      {/* Switch to Register link */}
      <div className="text-center pt-2 border-t border-slate-100">
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-sm"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
