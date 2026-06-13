import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function UploadProjectView({ project, setProject, token }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Report');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState(''); // 'success' or 'error'

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title.trim() || !file) {
      setMsg('Please provide a title and select a file.');
      setMsgType('error');
      return;
    }

    setIsSubmitting(true);
    setMsg('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('file', file);

      const res = await fetch(`/api/projects/${project._id}/documents`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const newDoc = await res.json();
        setProject({
          ...project,
          documents: [...(project.documents || []), newDoc]
        });
        setTitle('');
        setType('Report');
        setFile(null);
        // Reset file input element
        document.getElementById('file-upload').value = '';
        setMsg('Document uploaded successfully!');
        setMsgType('success');
      } else {
        const errData = await res.json();
        setMsg(errData.message || 'Failed to upload document');
        setMsgType('error');
      }
    } catch (err) {
      console.error(err);
      setMsg('Network error occurred.');
      setMsgType('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMsg(''), 5000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0B1220] tracking-tight">Upload Documents</h2>
        <p className="text-sm text-slate-500 font-medium">
          Submit your project reports, source code links, and presentation slides.
        </p>
      </div>

      {/* Alert */}
      {msg && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border ${
          msgType === 'success' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border-rose-200'
        }`}>
          {msgType === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {msg}
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleUpload} className="space-y-5">
          
          {/* Document Title */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Document Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Final SRS Report v1.0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-slate-50 focus:bg-white placeholder:text-slate-400"
            />
          </div>

          {/* Document Type */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Document Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={isSubmitting}
              className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all bg-slate-50 focus:bg-white text-slate-700 cursor-pointer appearance-none"
            >
              <option value="Report">Project Report (PDF/DOC)</option>
              <option value="Source Code">Source Code (GitHub Repo Link/Zip)</option>
              <option value="Presentation">Presentation (PPT/PDF)</option>
              <option value="Other">Other Document</option>
            </select>
          </div>

          {/* Document File Upload */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Attach File
            </label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" />
                  <p className="text-sm font-semibold text-slate-500">
                    {file ? <span className="text-indigo-600">{file.name}</span> : <span>Click to upload or drag and drop</span>}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">PDF, DOCX, ZIP, PPTX (MAX. 50MB)</p>
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files[0])}
                  disabled={isSubmitting}
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 text-sm font-bold text-white px-6 py-4 rounded-xl bg-[#0B1220] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:bg-slate-400 disabled:cursor-not-allowed cursor-pointer uppercase tracking-widest"
          >
            <FileText className="w-5 h-5" />
            <span>{isSubmitting ? 'Uploading...' : 'Submit Document'}</span>
          </button>
        </form>
      </div>

    </div>
  );
}
