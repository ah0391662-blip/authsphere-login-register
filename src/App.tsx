import React, { useState, useEffect } from 'react';
import { AuthLayout } from './components/AuthLayout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage, User } from './types/auth';

const STORAGE_USERS_KEY = 'authsphere_users';
const STORAGE_SESSION_KEY = 'authsphere_session';

const DEFAULT_USERS: User[] = [
  {
    id: 'usr_demo_1',
    fullName: 'Alex Morgan',
    email: 'alex@example.com',
    password: 'password123',
    createdAt: new Date('2026-01-15T10:00:00Z').toISOString(),
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<AuthPage>('login');
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    return DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SESSION_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [registeredNotification, setRegisteredNotification] = useState<string | null>(null);

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }
  }, [users]);

  // Sync session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_SESSION_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const handleRegisterSuccess = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
    setRegisteredNotification(
      `Account created for ${newUser.fullName}! You can now sign in.`
    );
    setCurrentPage('login');
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setRegisteredNotification(null);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleNavigate = (page: AuthPage) => {
    setRegisteredNotification(null);
    setCurrentPage(page);
  };

  // Determine header titles
  const getHeaderInfo = () => {
    switch (currentPage) {
      case 'register':
        return {
          title: 'Create an Account',
          subtitle: 'Enter your details below to get started with AuthSphere',
        };
      case 'dashboard':
        return {
          title: 'User Profile',
          subtitle: 'Manage your active authentication session',
        };
      case 'login':
      default:
        return {
          title: 'Welcome Back',
          subtitle: 'Please enter your credentials to access your account',
        };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <AuthLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      title={title}
      subtitle={subtitle}
    >
      {currentPage === 'login' && (
        <LoginPage
          onNavigateToRegister={() => handleNavigate('register')}
          onLoginSuccess={handleLoginSuccess}
          users={users}
          registeredNotification={registeredNotification}
          onClearNotification={() => setRegisteredNotification(null)}
        />
      )}

      {currentPage === 'register' && (
        <RegisterPage
          onNavigateToLogin={() => handleNavigate('login')}
          onRegisterSuccess={handleRegisterSuccess}
          existingUsers={users}
        />
      )}

      {currentPage === 'dashboard' && currentUser && (
        <DashboardPage
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
    </AuthLayout>
  );
}
