import React, { useState } from 'react';
import { FileText, DownloadCloud, FolderGit2, Search } from 'lucide-react';

export default function DocumentsView({ projects }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProjId, setSelectedProjId] = useState('All');

  // Aggregate all documents from all projects
  let allDocuments = [];
  projects.forEach(p => {
    if (p.documents && p.documents.length > 0) {
      p.documents.forEach(doc => {
        allDocuments.push({
          ...doc,
          projectInfo: {
            _id: p._id,
            projectId: p.projectId,
            title: p.title,
            team: p.team
          }
        });
      });
    }
  });

  // Sort by upload date descending
  allDocuments.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

  // Filter
  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.projectInfo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProjId === 'All' || doc.projectInfo._id === selectedProjId;
    return matchesSearch && matchesProject;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Documents Vault</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Access all project reports, presentations, and files uploaded by your student groups.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search documents by title or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-slate-400" />
          <select 
            value={selectedProjId}
            onChange={(e) => setSelectedProjId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold px-3 py-2 focus:outline-none focus:border-indigo-500 max-w-xs"
          >
            <option value="All">All Projects</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>[{p.projectId}] {p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
          <FileText className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Uploaded Files ({filteredDocuments.length})</h3>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-bold text-sm">
            No documents found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                      {doc.type}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-[#0B1220] mb-1 line-clamp-2" title={doc.title}>{doc.title}</h4>
                  
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-0.5">
                      {doc.projectInfo.projectId}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 line-clamp-1">
                      {doc.projectInfo.title}
                    </p>
                  </div>
                </div>
                
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </span>
                  
                  <a 
                    href={doc.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 px-3 py-1.5 rounded-lg transition-colors border border-indigo-200 hover:border-indigo-600 bg-white"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    <span>View / Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
