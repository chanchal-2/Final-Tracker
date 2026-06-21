import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, ClipboardList, FolderOpen } from 'lucide-react';

export default function ProgressUpdatesView({ project, setProject, logs, setLogs, token, setActiveTab }) {

  // ── Document Upload State ───────────────────────────
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState('Report');
  const [docFile, setDocFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const [uploadMsgType, setUploadMsgType] = useState('');

  // ── Upload Document ─────────────────────────────────
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!docTitle.trim() || !docFile) {
      setUploadMsg('Please provide a title and select a file.');
      setUploadMsgType('error');
      return;
    }
    setUploading(true);
    setUploadMsg('');
    try {
      const formData = new FormData();
      formData.append('title', docTitle);
      formData.append('type', docType);
      formData.append('file', docFile);
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects/${project._id}/documents`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        const newDoc = await res.json();
        setProject({ ...project, documents: [...(project.documents || []), newDoc] });
        setDocTitle('');
        setDocType('Report');
        setDocFile(null);
        document.getElementById('file-upload-merged').value = '';
        setUploadMsg('✓ Document uploaded successfully!');
        setUploadMsgType('success');
      } else {
        const err = await res.json();
        setUploadMsg(err.message || 'Failed to upload document');
        setUploadMsgType('error');
      }
    } catch (err) {
      setUploadMsg('Network error. Please try again.');
      setUploadMsgType('error');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadMsg(''), 5000);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0B1220] tracking-tight">Upload</h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Upload project documents and resources.</p>
          </div>
        </div>

        {/* View Documents Button */}
        <button
          onClick={() => setActiveTab('documents')}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0B1220] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <FolderOpen className="w-4 h-4" />
          <span className="hidden sm:inline">View Documents</span>
          <span className="sm:hidden">Docs</span>
        </button>
      </div>

      {/* Centered single-column layout */}
      <div className="max-w-2xl mx-auto">

        {/* ── RIGHT: Upload Document ────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm h-full">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0B1220] tracking-tight">Upload Document</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Reports, Code & Slides</p>
            </div>
          </div>

          {/* Alert */}
          {uploadMsg && (
            <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-xs font-bold border ${
              uploadMsgType === 'success'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                : 'bg-rose-50 text-rose-700 border-rose-100'
            }`}>
              {uploadMsgType === 'success'
                ? <CheckCircle className="w-4 h-4 shrink-0" />
                : <AlertCircle className="w-4 h-4 shrink-0" />}
              {uploadMsg}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            {/* Document Title */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Document Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Final SRS Report v1.0"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                disabled={uploading}
                className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-slate-50 focus:bg-white placeholder:text-slate-400"
              />
            </div>

            {/* Document Type */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Document Type
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                disabled={uploading}
                className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-slate-50 focus:bg-white text-slate-700 cursor-pointer"
              >
                <option value="Report">Project Report (PDF/DOC)</option>
                <option value="Source Code">Source Code (GitHub / ZIP)</option>
                <option value="Presentation">Presentation (PPT/PDF)</option>
                <option value="Other">Other Document</option>
              </select>
            </div>

            {/* File Upload */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Attach File
              </label>
              <label
                htmlFor="file-upload-merged"
                className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
              >
                <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-indigo-500 mb-1.5 transition-colors" />
                <p className="text-xs font-semibold text-slate-500">
                  {docFile
                    ? <span className="text-indigo-600 font-bold">{docFile.name}</span>
                    : <span>Click to upload or drag & drop</span>
                  }
                </p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">PDF, DOCX, ZIP, PPTX (MAX. 50MB)</p>
                <input
                  id="file-upload-merged"
                  type="file"
                  className="hidden"
                  onChange={(e) => setDocFile(e.target.files[0])}
                  disabled={uploading}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full text-xs font-bold text-white px-5 py-3.5 rounded-xl bg-[#0B1220] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:bg-slate-400 uppercase tracking-widest"
            >
              <FileText className="w-4 h-4" />
              <span>{uploading ? 'Uploading...' : 'Submit Document'}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
