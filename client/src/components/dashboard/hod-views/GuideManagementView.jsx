import React from 'react';
import { Users, Star, Clock, FileCheck, FileClock, RefreshCw } from 'lucide-react';

export default function GuideManagementView() {
  // Mock data as requested since backend doesn't currently track guide performance metrics natively
  const guides = [
    { id: 1, name: 'Dr. Ananya Rao', groups: 8, maxGroups: 10, completedReviews: 45, pendingReviews: 3, avgResponse: '1.2 days', rating: 4.8 },
    { id: 2, name: 'Prof. Rajesh Gowda', groups: 12, maxGroups: 12, completedReviews: 60, pendingReviews: 14, avgResponse: '3.5 days', rating: 3.9 },
    { id: 3, name: 'Dr. Srinivas Murthy', groups: 5, maxGroups: 10, completedReviews: 28, pendingReviews: 1, avgResponse: '0.8 days', rating: 4.9 },
    { id: 4, name: 'Dr. Kavitha S.', groups: 9, maxGroups: 10, completedReviews: 35, pendingReviews: 5, avgResponse: '2.1 days', rating: 4.4 },
    { id: 5, name: 'Prof. Vikram Shetty', groups: 7, maxGroups: 8, completedReviews: 20, pendingReviews: 8, avgResponse: '4.0 days', rating: 3.5 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#0B1220] tracking-tight">Guide Management</h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">Monitor faculty workload, review performance, and reassign projects.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0B1220] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-600 transition-colors shadow-sm">
          <Users className="w-4 h-4" />
          Add New Guide
        </button>
      </div>

      <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                <th className="py-4 px-6">Guide Name</th>
                <th className="py-4 px-6 w-48">Workload (Assigned Groups)</th>
                <th className="py-4 px-6 text-center">Completed Reviews</th>
                <th className="py-4 px-6 text-center">Pending Reviews</th>
                <th className="py-4 px-6">Avg Response Time</th>
                <th className="py-4 px-6">Performance & Rank</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {guides.map((guide, idx) => {
                const workloadPct = (guide.groups / guide.maxGroups) * 100;
                let workloadColor = 'bg-emerald-500';
                if (workloadPct > 70) workloadColor = 'bg-amber-500';
                if (workloadPct >= 100) workloadColor = 'bg-rose-500';

                return (
                  <tr key={guide.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm overflow-hidden">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(guide.name)}&background=e0e7ff&color=4f46e5`} alt={guide.name} />
                        </div>
                        <div>
                          <span className="font-bold text-[#0B1220] block flex items-center gap-2">
                            {guide.name}
                            {guide.rating > 4.5 && <span className="bg-amber-100 text-amber-700 text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded font-black border border-amber-200">Top Rated</span>}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{guide.groups * 4} Students Supervised</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex justify-between text-[10px] font-bold mb-1">
                        <span className="text-slate-600">{guide.groups} / {guide.maxGroups} Groups</span>
                        <span className={workloadPct >= 100 ? 'text-rose-600' : 'text-slate-400'}>{workloadPct.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${workloadColor} rounded-full transition-all duration-1000`} style={{ width: `${workloadPct}%` }}></div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg border border-emerald-100 font-bold">
                        <FileCheck className="w-4 h-4" />
                        {guide.completedReviews}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-bold ${
                        guide.pendingReviews > 10 
                          ? 'bg-rose-50 text-rose-600 border-rose-100' 
                          : guide.pendingReviews > 5 
                            ? 'bg-amber-50 text-amber-600 border-amber-100' 
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        <FileClock className="w-4 h-4" />
                        {guide.pendingReviews}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${parseFloat(guide.avgResponse) > 3 ? 'text-rose-400' : 'text-slate-400'}`} />
                        <span className={`font-semibold ${parseFloat(guide.avgResponse) > 3 ? 'text-rose-600' : 'text-slate-600'}`}>
                          {guide.avgResponse}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= Math.floor(guide.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} 
                            />
                          ))}
                          <span className="font-bold text-[#0B1220] ml-1">{guide.rating}</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Dept Rank: #{idx + 1}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1.5 rounded-lg transition-colors">
                          Details
                        </button>
                        <button className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 px-2 py-1.5 rounded-lg transition-colors" title="Reassign Groups">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
