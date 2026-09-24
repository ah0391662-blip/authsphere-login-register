export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  createdAt: string;
}

export type AuthPage = 'login' | 'register' | 'dashboard';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
