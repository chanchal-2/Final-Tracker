import React, { useState } from 'react';
import { Megaphone, Send, Clock, Users, Eye, CheckCircle2 } from 'lucide-react';

export default function AnnouncementsView({ token }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('all-students');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Mock past announcements
  const pastAnnouncements = [
    { id: 1, title: 'Final Report Format Guidelines', date: 'June 10, 2026', recipients: 'All Students', readPct: 85, status: 'Sent' },
    { id: 2, title: 'Mid-term Evaluation Schedule', date: 'June 05, 2026', recipients: 'All Guides', readPct: 100, status: 'Sent' },
    { id: 3, title: 'Plagiarism Policy Update', date: 'June 18, 2026', recipients: 'All Students', readPct: 0, status: 'Scheduled' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, message, recipient })
      });

      if (res.ok) {
        setSuccess(true);
        setTitle('');
        setMessage('');
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const errorData = await res.json();
        setErrorMsg(`Server Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(`Network Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Announcements</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Publish notices to students, faculty, or specific project groups.</p>
        </div>
        <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
          <Megaphone className="w-4 h-4" />
          Broadcast Center
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Compose Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm p-6 sm:p-8 relative overflow-hidden">
            {/* Subtle Top Glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-6 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-indigo-500" />
              Compose New Notice
            </h3>

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 animate-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <p className="text-sm font-bold text-emerald-700">Announcement successfully published!</p>
              </div>
            )}
            
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 animate-in slide-in-from-top-2">
                <p className="text-sm font-bold text-rose-700">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mandatory Project Display Guidelines"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Recipients</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full text-sm font-semibold pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 bg-slate-50 focus:bg-white text-slate-700 transition-all cursor-pointer appearance-none"
                    >
                      <option value="all-students">All Department Students</option>
                      <option value="all-guides">All Faculty Guides</option>
                      <option value="both">Both Students & Guides</option>
                      <option value="specific">Specific Groups (Selection)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Priority</label>
                  <select
                    className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 bg-slate-50 focus:bg-white text-slate-700 transition-all cursor-pointer appearance-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Message Content</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Type your official announcement here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-sm font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 bg-slate-50 focus:bg-white transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Attachment (Optional)</label>
                <input 
                  type="file" 
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isScheduled} 
                    onChange={(e) => setIsScheduled(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Schedule for Later
                  </span>
                </label>

                {isScheduled && (
                  <input 
                    type="datetime-local" 
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    required={isScheduled}
                    className="flex-1 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 bg-white"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-white bg-[#0B1220] hover:bg-indigo-600 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.15)] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Publishing...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Publish Announcement
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: History & Stats */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm p-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-500" />
              Publishing History
            </h3>

            <div className="space-y-4">
              {pastAnnouncements.map((ann) => (
                <div key={ann.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-100 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                      ann.status === 'Sent' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {ann.status}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0B1220] mb-2 line-clamp-2" title={ann.title}>{ann.title}</h4>
                  
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 text-slate-400" /> {ann.recipients}</span>
                    <span className={`flex items-center gap-1 ${ann.readPct === 100 ? 'text-emerald-500' : 'text-indigo-500'}`}>
                      <Eye className="w-3 h-3" /> {ann.readPct}% Read
                    </span>
                  </div>
                  
                  {ann.status === 'Sent' && (
                    <div className="h-1 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${ann.readPct}%` }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-50 hover:text-indigo-600 transition-colors">
              View All History
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
