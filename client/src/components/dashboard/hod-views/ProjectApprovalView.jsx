import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, FileText, Clock, Users, Database, Code2, Calendar, GraduationCap } from 'lucide-react';

export default function ProjectApprovalView({ projects, setProjects, token }) {
  const [approvingId, setApprovingId] = useState(null);
  const [viewingPdf, setViewingPdf] = useState(null);

  // Dummy function for UI purposes
  const [localDummyProjects, setLocalDummyProjects] = useState([
    {
      _id: 'dummy-1',
      projectId: 'PRJ-1082',
      title: 'Quantum Key Distribution Simulator',
      domain: 'Cyber Security',
      abstract: 'This project simulates quantum key distribution protocols (BB84, E91) over noisy channels to evaluate error rates and security bounds. It includes a visualization dashboard for interception attempts.',
      team: ['Alex P.'],
      tech: ['Python', 'Qiskit', 'React', 'Node.js'],
      submittedDate: 'June 10, 2026',
      guide: 'Dr. Srinivas',
      status: 'pending'
    },
    {
      _id: 'dummy-2',
      projectId: 'PRJ-1083',
      title: 'Decentralized Academic Credential Verifier',
      domain: 'Blockchain',
      abstract: 'A web3 application designed to issue, store, and verify university degrees on the Ethereum blockchain, eliminating credential fraud and reducing verification times for employers.',
      team: ['Jane Smith'],
      tech: ['Solidity', 'Ethereum', 'Next.js', 'IPFS'],
      submittedDate: 'June 12, 2026',
      guide: 'Prof. Rajesh Gowda',
      status: 'pending'
    },
    {
      _id: 'dummy-3',
      projectId: 'PRJ-1084',
      title: 'AI-Powered Traffic Light Optimization',
      domain: 'Artificial Intelligence',
      abstract: 'Utilizing computer vision and reinforcement learning to dynamically adjust traffic light timings based on real-time vehicle density, aiming to reduce average waiting times by 30%.',
      team: ['Michael B.'],
      tech: ['TensorFlow', 'OpenCV', 'Python', 'React'],
      submittedDate: 'June 13, 2026',
      status: 'pending'
    }
  ]);

  let pendingProjects = projects?.filter(p => p.status === 'pending') || [];
  if (pendingProjects.length === 0) {
    pendingProjects = localDummyProjects;
  }

  // Helper to extract dummy meta info for display
  const getDummyMeta = (project) => {
    return {
      domain: project.domain || 'Computer Science',
      abstract: project.abstract || 'Abstract Preview: This project focuses on solving complex problems within the specified domain by utilizing advanced architectures and algorithms. It aims to streamline operations and provide an efficient, scalable solution.',
      team: Array.isArray(project.team) ? project.team : ['Student A'],
      tech: Array.isArray(project.tech) ? project.tech : ['React', 'Node.js', 'MongoDB'],
      guide: project.guide || 'Not Assigned Yet',
      date: project.submittedDate || 'Recently'
    };
  };

  const handleAction = (id, actionType) => {
    // Simulate API call delay
    setApprovingId(id);
    setTimeout(() => {
      // Remove from dummy state to show it was processed
      setLocalDummyProjects(prev => prev.filter(p => p._id !== id));
      setApprovingId(null);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Project Approval Center</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Review and manage pending capstone project proposals.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="bg-slate-50 border border-slate-200 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500">
            <option>All Domains</option>
            <option>Artificial Intelligence</option>
            <option>Web Development</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500">
            <option>Status: Pending</option>
            <option>Status: Approved</option>
            <option>Status: Rejected</option>
          </select>
          <div className="hidden sm:flex px-4 py-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 font-bold text-xs uppercase tracking-wider items-center gap-2">
            <Clock className="w-4 h-4" />
            {pendingProjects.length} Pending
          </div>
        </div>
      </div>

      {pendingProjects.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-base font-bold text-slate-800">All Caught Up!</h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">There are no pending project proposals at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pendingProjects.map((p) => {
            const meta = getDummyMeta(p);
            
            return (
              <div key={p._id} className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row group hover:shadow-md transition-shadow">
                
                {/* Left Content */}
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md uppercase tracking-widest">
                      {p.projectId || 'PRJ-NEW'}
                    </span>
                    <span className="text-[10px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md uppercase tracking-widest">
                      {meta.domain}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#0B1220] mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                    {meta.abstract}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Student</p>
                        <p className="text-xs font-semibold text-slate-700">{meta.team.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Code2 className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Technologies</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {meta.tech.map((t, i) => (
                            <span key={i} className="text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Submitted: {meta.date}</span>
                    <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Guide: {meta.guide}</span>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 md:p-8 flex flex-col justify-center gap-3 lg:w-64 shrink-0">
                  <button 
                    onClick={() => handleAction(p._id, 'approve')}
                    disabled={approvingId === p._id}
                    className="w-full bg-[#0B1220] hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-[#0B1220] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-slate-900/10 hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {approvingId === p._id ? 'Processing...' : 'Approve Proposal'}
                  </button>
                  <button 
                    onClick={() => handleAction(p._id, 'request_changes')}
                    disabled={approvingId === p._id}
                    className="w-full bg-white hover:bg-amber-50 disabled:opacity-50 text-slate-700 hover:text-amber-700 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl border border-slate-200 hover:border-amber-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" /> Request Changes
                  </button>
                  <button 
                    onClick={() => handleAction(p._id, 'reject')}
                    disabled={approvingId === p._id}
                    className="w-full bg-white hover:bg-rose-50 disabled:opacity-50 text-slate-700 hover:text-rose-700 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                  
                  <div className="h-px bg-slate-200 my-2"></div>
                  
                  <button 
                    onClick={() => setViewingPdf(p)}
                    className="w-full bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> View Full PDF
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1220]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{viewingPdf.title} - Full Proposal</h3>
                  <p className="text-xs font-semibold text-slate-500">{viewingPdf.projectId} • {viewingPdf.domain}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewingPdf(null)}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body (Fake PDF Viewer) */}
            <div className="flex-1 bg-slate-100 p-4 sm:p-8 overflow-y-auto">
              <div className="max-w-2xl mx-auto bg-white min-h-[800px] shadow-sm border border-slate-200 rounded-lg p-8 sm:p-12">
                <div className="text-center mb-12">
                  <h1 className="text-3xl font-black text-slate-800 mb-4">{viewingPdf.title}</h1>
                  <p className="text-lg font-semibold text-slate-600 mb-2">Capstone Project Proposal</p>
                  <p className="text-sm font-medium text-slate-500">Domain: {viewingPdf.domain}</p>
                </div>
                
                <div className="space-y-8">
                  <section>
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">1. Abstract</h2>
                    <p className="text-slate-600 leading-relaxed">{getDummyMeta(viewingPdf).abstract}</p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">2. Student Details</h2>
                    <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1">
                      {getDummyMeta(viewingPdf).team.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">3. Proposed Technology Stack</h2>
                    <div className="flex flex-wrap gap-2">
                      {getDummyMeta(viewingPdf).tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 font-semibold text-sm rounded-md border border-slate-200">{t}</span>
                      ))}
                    </div>
                  </section>
                </div>
                
                {/* Watermark */}
                <div className="mt-20 pt-8 border-t border-slate-200 flex justify-between items-center opacity-50">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ProjectTracker Confidential</span>
                  <span className="text-xs font-bold text-slate-400">Page 1 of 12</span>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
              <button 
                onClick={() => {
                  handleAction(viewingPdf._id, 'approve');
                  setViewingPdf(null);
                }}
                className="px-6 py-2.5 bg-[#0B1220] hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-slate-900/10 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
