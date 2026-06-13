import React from 'react';
import { FileText, DownloadCloud, ExternalLink } from 'lucide-react';

export default function DocumentsView({ project }) {
  const documents = project.documents || [];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#0B1220] tracking-tight">Project Documents</h2>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
          {documents.length} Files
        </span>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0B1220]">No documents yet</h3>
          <p className="text-sm text-slate-500 font-medium mt-2 max-w-sm mx-auto">
            You haven't uploaded any project reports or source code links yet. Use the Upload Project tab to submit your files.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                  {doc.type}
                </span>
              </div>
              
              <h3 className="text-sm font-bold text-[#0B1220] tracking-tight mb-1 line-clamp-1">
                {doc.title}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-6">
                Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
              </p>
              
              <div className="flex items-center gap-2">
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-200"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <span>View Link</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
