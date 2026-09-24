import React from 'react';
import { User, LogOut, CheckCircle2, Shield, Calendar, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { User as UserType } from '../types/auth';

interface DashboardPageProps {
  currentUser: UserType;
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  onLogout,
}) => {
  const formattedDate = new Date(currentUser.createdAt).toLocaleDateString(
    undefined,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xl">
            {currentUser.fullName
              ? currentUser.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : 'U'}
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        <h2 className="mt-3 text-xl font-bold text-slate-900">
          {currentUser.fullName}
        </h2>
        <p className="text-sm text-slate-500">{currentUser.email}</p>
      </div>

      {/* Session details */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Authentication Status</span>
          </div>
          <span className="font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
            Active
          </span>
        </div>

        <div className="border-t border-slate-200/60 pt-2.5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Mail className="w-3.5 h-3.5" /> Email
            </span>
            <span className="font-mono text-slate-800">{currentUser.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5" /> Member Since
            </span>
            <span className="text-slate-800">{formattedDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Shield className="w-3.5 h-3.5" /> Auth Provider
            </span>
            <span className="text-slate-800">Local AuthSphere</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 space-y-2">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={onLogout}
          icon={<LogOut className="w-4 h-4 text-slate-500" />}
        >
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
};
