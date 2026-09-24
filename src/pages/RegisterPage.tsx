import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, Check, UserPlus } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { FormErrors, RegisterFormData, User } from '../types/auth';

interface RegisterPageProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: (newUser: User) => void;
  existingUsers: User[];
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onNavigateToLogin,
  onRegisterSuccess,
  existingUsers,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@example.com)';
        isValid = false;
      } else {
        // Check if email already exists
        const exists = existingUsers.some(
          (u) => u.email.toLowerCase() === formData.email.trim().toLowerCase()
        );
        if (exists) {
          newErrors.email = 'This email address is already registered';
          isValid = false;
        }
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    if (!validate()) {
      setGeneralError('Please correct the errors in the form before submitting.');
      return;
    }

    setIsLoading(true);
    setGeneralError(null);

    // Simulate snappy network delay for realistic experience
    setTimeout(() => {
      setIsLoading(false);

      const newUser: User = {
        id: 'usr_' + Date.now(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        createdAt: new Date().toISOString(),
      };

      onRegisterSuccess(newUser);
    }, 400);
  };

  return (
    <div className="space-y-5">
      {/* General form error if present */}
      {generalError && (
        <Alert
          type="error"
          message={generalError}
          onClose={() => setGeneralError(null)}
        />
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* Full Name Input */}
        <Input
          id="register-fullName"
          name="fullName"
          type="text"
          label="Full Name"
          placeholder="e.g. Sarah Jenkins"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
          icon={<UserIcon className="h-4 w-4" />}
          required
        />

        {/* Email Input */}
        <Input
          id="register-email"
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
          id="register-password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a secure password"
          helperText="At least 6 characters"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          icon={<Lock className="h-4 w-4" />}
          required
        />

        {/* Confirm Password Input */}
        <Input
          id="register-confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          icon={<Check className="h-4 w-4" />}
          required
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            icon={<UserPlus className="h-4 w-4" />}
          >
            Create Account
          </Button>
        </div>
      </form>

      {/* Switch to Login link */}
      <div className="text-center pt-2 border-t border-slate-100">
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-sm"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
