import React, { useState } from 'react';
import { 
  Database, FileText, Search, Filter, Download, Eye, 
  Share2, Star, History, Clock, FileType, FileCheck, 
  AlertCircle, Activity, BarChart2, CheckCircle2,
  FolderArchive, FileCode, Presentation, Calendar, 
  ChevronDown, MessageSquare
} from 'lucide-react';

export default function DocumentRepositoryView() {
  const [activeTab, setActiveTab] = useState('library');

  const stats = [
    { label: 'Total Documents', count: '1,248', icon: Database, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { label: 'Proposals', count: '156', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Weekly Reports', count: '892', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Final Reports', count: '45', icon: FileCheck, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'Source Code', count: '120', icon: FileCode, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    { label: 'Presentations', count: '35', icon: Presentation, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' }
  ];

  const documents = [
    { 
      id: 'DOC-1042', 
      title: 'Final System Architecture & API Design', 
      project: 'AI Autonomous Drones', 
      group: 'Team Alpha (CSE-42)',
      guide: 'Dr. Ananya Rao',
      domain: 'AI/ML',
      type: 'Design Document',
      typeIcon: FileText,
      uploaded: '10 mins ago',
      size: '2.4 MB',
      version: 'v2.1',
      status: 'Approved',
      isImportant: true
    },
    { 
      id: 'DOC-1043', 
      title: 'Sprint 3 Source Code Archive', 
      project: 'Blockchain Land Registry', 
      group: 'Team Block (CSE-18)',
      guide: 'Prof. Rajesh Gowda',
      domain: 'Blockchain',
      type: 'Source Code',
      typeIcon: FileCode,
      uploaded: '1 hour ago',
      size: '45.8 MB',
      version: 'v1.0',
      status: 'Pending Review',
      isImportant: false
    },
    { 
      id: 'DOC-1044', 
      title: 'IoT Sensor Calibration Report', 
      project: 'Predictive Maintenance IoT', 
      group: 'IoT Wizards (CSE-09)',
      guide: 'Dr. Srinivas',
      domain: 'IoT',
      type: 'Weekly Report',
      typeIcon: Activity,
      uploaded: 'Yesterday',
      size: '1.1 MB',
      version: 'v1.0',
      status: 'Approved',
      isImportant: false
    },
    { 
      id: 'DOC-1045', 
      title: 'Mid-term Presentation Deck', 
      project: 'Smart Grid Load Balancer', 
      group: 'Grid Ops (CSE-55)',
      guide: 'Dr. Kavitha S.',
      domain: 'Cloud Computing',
      type: 'Presentation',
      typeIcon: Presentation,
      uploaded: '2 days ago',
      size: '15.6 MB',
      version: 'v3.0',
      status: 'Missing/Rejected',
      isImportant: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-[#0B1220] to-[#0B1220] rounded-[24px] p-8 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3 mb-2">
              <FolderArchive className="w-8 h-8 text-indigo-400" />
              Project Document Repository
            </h1>
            <p className="text-sm text-indigo-200/70 font-medium">
              Access, search, and manage all project documents across the department.
            </p>
          </div>
          <button onClick={() => alert('Compiling ZIP archive for download...')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Archive
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} onClick={() => alert(`Filtering by: ${s.label}`)} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.color} border ${s.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</h4>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-xl font-black text-white">{s.count}</span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center">+12%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Smart Search & Filter */}
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by project, student, file name, or tech..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
              </div>
              <button onClick={() => alert('Opening advanced filter modal...')} className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all">
                <Filter className="w-4 h-4" /> Filters
                <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded text-[10px] ml-1">3</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
              {['Academic Year: 2026', 'Domain: AI/ML', 'Status: Approved'].map((chip, i) => (
                <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-indigo-100">
                  {chip}
                  <button onClick={() => alert(`Removed filter: ${chip}`)} className="hover:bg-indigo-200 rounded-full p-0.5"><AlertCircle className="w-3 h-3 rotate-45" /></button>
                </div>
              ))}
              <button onClick={() => alert('Cleared all filters!')} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider px-2">Clear All</button>
            </div>
          </div>

          {/* Document Library */}
          <div className="space-y-4">
            {documents.map((doc, idx) => {
              const DocIcon = doc.typeIcon;
              return (
                <div key={doc.id} className="bg-white rounded-[20px] border border-slate-200 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col md:flex-row gap-6">
                  
                  {/* File Type Icon */}
                  <div className="shrink-0 flex flex-col items-center justify-center w-16">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                      <DocIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-widest text-center">{doc.version}</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-widest">
                        {doc.id}
                      </span>
                      {doc.status === 'Approved' && <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-widest">Approved</span>}
                      {doc.status === 'Pending Review' && <span className="text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded uppercase tracking-widest">Pending Review</span>}
                      {doc.status === 'Missing/Rejected' && <span className="text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded uppercase tracking-widest">Rejected</span>}
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#0B1220] leading-snug mb-2 pr-8 relative">
                      {doc.title}
                      <button onClick={() => alert(`Toggled importance for ${doc.title}`)} className="absolute right-0 top-0 text-slate-300 hover:text-amber-400 transition-colors">
                        <Star className={`w-5 h-5 ${doc.isImportant ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5"><FolderArchive className="w-3.5 h-3.5 text-slate-400" /> {doc.project}</span>
                      <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-slate-400" /> {doc.domain}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Group</p>
                        <p className="text-xs font-semibold text-slate-700">{doc.group}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Guide</p>
                        <p className="text-xs font-semibold text-slate-700">{doc.guide}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Size / Date</p>
                        <p className="text-xs font-semibold text-slate-700">{doc.size} • {doc.uploaded}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 md:col-start-4">
                        <button onClick={() => alert(`Viewing version history for ${doc.id}`)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors" title="View Version History">
                          <History className="w-4 h-4" />
                        </button>
                        <button onClick={() => alert(`Share link copied for ${doc.id}!`)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-colors" title="Share Document">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => alert(`Started downloading ${doc.title}...`)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button onClick={() => alert(`Opening document viewer for ${doc.id}`)} className="px-3 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm gap-1.5" title="View Document">
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
          
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Recent Activity */}
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-indigo-500" />
              Recent Activity
            </h3>
            
            <div className="space-y-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {[
                { time: '10 mins ago', msg: 'Group 12 uploaded Final Report', icon: FileCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { time: '1 hour ago', msg: 'Team Alpha submitted Source Code', icon: FileCode, color: 'text-purple-500', bg: 'bg-purple-50' },
                { time: '2 hours ago', msg: 'Dr. Sharma approved Design Doc', icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-50' },
                { time: 'Today', msg: 'New Proposal from Group 05', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-50' }
              ].map((act, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${act.bg} ${act.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                    <act.icon className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-700 leading-snug">{act.msg}</p>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Analytics Mini */}
          <div className="bg-gradient-to-br from-indigo-900 to-[#0B1220] rounded-[24px] border border-indigo-800 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none"></div>
            
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6 relative z-10">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              Submission Rates
            </h3>

            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-indigo-200">Proposals</span>
                  <span className="text-white">98%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-indigo-200">Mid-term Reports</span>
                  <span className="text-white">85%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-indigo-200">Final Submissions</span>
                  <span className="text-amber-400">12%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[12%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
