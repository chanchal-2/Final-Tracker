import React from 'react';
import { FileText, Users, Bell, PieChart, User } from 'lucide-react';

const createPlaceholder = (title, icon, message) => {
  return function Placeholder() {
    return (
      <div className="bg-white border border-slate-100 rounded-[24px] p-12 shadow-premium text-center space-y-4 max-w-2xl mx-auto mt-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-[#0B1220]">{title}</h2>
        <p className="text-sm text-slate-500 font-semibold leading-relaxed max-w-md mx-auto">
          {message}
        </p>
      </div>
    );
  };
};

const PlaceholderViews = {
  Documents: createPlaceholder('Documents Vault', <FileText className="w-8 h-8" />, 'All documents uploaded by your assigned groups will appear here for bulk review and download.'),
  Meetings: createPlaceholder('Schedule Meetings', <Users className="w-8 h-8" />, 'Schedule and track upcoming progress review meetings with your assigned project groups.'),
  Notifications: createPlaceholder('Notifications Center', <Bell className="w-8 h-8" />, 'Important alerts, deadline reminders, and system notifications will be displayed here.'),
  Reports: createPlaceholder('Analytics & Reports', <PieChart className="w-8 h-8" />, 'Generate comprehensive performance reports and export evaluation data across all assigned projects.'),
  Profile: createPlaceholder('My Profile', <User className="w-8 h-8" />, 'Manage your faculty profile, contact details, department preferences, and account settings.'),
};

export default PlaceholderViews;
