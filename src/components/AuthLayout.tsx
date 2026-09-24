import React from 'react';
import { ShieldCheck, LockKeyhole } from 'lucide-react';
import { AuthPage } from '../types/auth';

interface AuthLayoutProps {
  children: React.ReactNode;
  currentPage: AuthPage;
  onNavigate: (page: AuthPage) => void;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      {/* Subtle background decoration */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => onNavigate('login')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
              <LockKeyhole className="w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-900 tracking-tight text-lg">
              Auth<span className="text-indigo-600">Sphere</span>
            </span>
          </div>

          {/* Quick tab switcher for easy review & responsive navigation */}
          {currentPage !== 'dashboard' && (
            <div className="flex items-center p-1 bg-slate-100/90 rounded-lg border border-slate-200/60">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  currentPage === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  currentPage === 'register'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {title}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
            </div>

            {children}
          </div>

          {/* Security guarantee note */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure 256-bit client-side state authentication</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/70 py-4 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} AuthSphere. Responsive React Authentication System.</p>
      </footer>
    </div>
  );
};
