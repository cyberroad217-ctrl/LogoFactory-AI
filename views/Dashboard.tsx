
import React, { useState } from 'react';
import { AgentActivity, Affiliate, CRMUser } from '../types';

const Dashboard: React.FC = () => {
  const [activities] = useState<AgentActivity[]>([
    { id: '1', timestamp: '14:22:01', message: 'Legal-Check: Bundle #442 clear of trademark collisions.', status: 'success', agentName: 'Legal' },
    { id: '2', timestamp: '14:21:45', message: 'Ad-Gen: Pushing Facebook creatives with Gemini hooks.', status: 'info', agentName: 'Marketing' },
    { id: '3', timestamp: '14:20:12', message: 'Veo-Engine: Rendering 14 cinematic logo intros...', status: 'info', agentName: 'Motion' },
    { id: '4', timestamp: '14:18:55', message: 'Retail-Hub: Synced new mockup assets.', status: 'success', agentName: 'Retail' },
    { id: '5', timestamp: '14:15:30', message: 'Analyst: Geolocation gap analysis NYC complete.', status: 'success', agentName: 'Analyst' },
  ]);

  const [affiliates] = useState<Affiliate[]>([
    { id: 'a1', name: 'EliteMarketer', sales: 1422, commission: 3550, tier: 'Gold' },
    { id: 'a2', name: 'DesignDeals', sales: 840, commission: 2100, tier: 'Silver' },
  ]);

  const [crmUsers] = useState<CRMUser[]>([
    { id: 'u1', company: 'NovaTech', licenseTier: 'Pro', lastDownload: '2m ago', usageCount: 145 },
    { id: 'u2', company: 'LuxBrands', licenseTier: 'Lifetime', lastDownload: '15m ago', usageCount: 890 },
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Command Center</h2>
              <p className="text-gray-600 font-mono text-[8px] uppercase tracking-widest mt-0.5">Monitoring Node // Silicon-01</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="glass px-2 py-0.5 rounded-lg text-[7px] font-black uppercase text-emerald-400 border border-white/5 flex items-center gap-1"><span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span> Legal: Clear</span>
              <span className="glass px-2 py-0.5 rounded-lg text-[7px] font-black uppercase text-indigo-400 border border-white/5">Veo: Active</span>
              <span className="glass px-2 py-0.5 rounded-lg text-[7px] font-black uppercase text-purple-400 border border-white/5">CRM: Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="glass p-4 rounded-xl border-white/5">
              <div className="text-[7px] text-gray-500 uppercase font-black tracking-widest mb-0.5">CRM Licenses</div>
              <div className="text-2xl font-black font-mono tracking-tighter">1,402</div>
              <div className="mt-1 text-[7px] text-emerald-400 font-bold uppercase">+12% lw</div>
            </div>
            <div className="glass p-4 rounded-xl border-white/5">
              <div className="text-[7px] text-gray-500 uppercase font-black tracking-widest mb-0.5">Lab Queries</div>
              <div className="text-2xl font-black font-mono tracking-tighter">12,840</div>
              <div className="mt-1 text-[7px] text-indigo-400 font-bold uppercase">Processing</div>
            </div>
            <div className="glass p-4 rounded-xl border-white/5">
              <div className="text-[7px] text-gray-500 uppercase font-black tracking-widest mb-0.5">Total Rev</div>
              <div className="text-2xl font-black font-mono tracking-tighter">$84.4K</div>
              <div className="mt-1 text-[7px] text-pink-400 font-bold uppercase">Pod+License</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass rounded-xl border-white/5 overflow-hidden flex flex-col h-[280px]">
               <div className="px-4 py-2 bg-white/5 border-b border-white/5 font-black uppercase tracking-widest text-[8px] flex justify-between items-center">
                 <span>Activity Logs</span>
                 <span className="text-emerald-400">SYNCING</span>
               </div>
               <div className="p-4 space-y-2.5 overflow-y-auto custom-scrollbar font-mono text-[9px]">
                  {activities.map(log => (
                    <div key={log.id} className="border-l border-white/10 pl-3 py-0.5">
                      <span className="text-gray-600">[{log.timestamp}]</span> <span className="text-indigo-400 font-bold uppercase">{log.agentName}</span>: <span className="text-gray-400">{log.message}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="glass rounded-xl border-white/5 overflow-hidden flex flex-col h-[280px]">
               <div className="px-4 py-2 bg-white/5 border-b border-white/5 font-black uppercase tracking-widest text-[8px]">CRM Management</div>
               <div className="p-3 space-y-2 overflow-y-auto custom-scrollbar">
                  {crmUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-2.5 glass rounded-lg border-white/5 text-[9px]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center font-black text-indigo-400 text-[10px]">{user.company.charAt(0)}</div>
                        <div>
                          <div className="font-black text-white">{user.company}</div>
                          <div className="text-[7px] text-gray-600 uppercase">{user.licenseTier}</div>
                        </div>
                      </div>
                      <div className="text-indigo-400 font-mono text-[8px]">{user.lastDownload}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass p-5 rounded-2xl border border-indigo-500/10">
            <h3 className="text-sm font-black uppercase italic mb-4 tracking-tight">Affiliates</h3>
            <div className="space-y-2">
              {affiliates.map(aff => (
                <div key={aff.id} className="flex items-center justify-between p-2.5 glass rounded-lg border-white/5">
                  <div className="text-[8px] font-black uppercase text-white">{aff.name}</div>
                  <div className="text-emerald-400 font-mono font-black tracking-tighter text-[10px]">${aff.commission}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass p-5 rounded-2xl border-white/5">
            <h3 className="text-sm font-black uppercase mb-4 italic tracking-tight">Ad-Tech</h3>
            <div className="space-y-3">
               <div className="space-y-1">
                 <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                   <span className="text-gray-500">CTR</span>
                   <span className="text-indigo-400">4.2%</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="w-[85%] h-full bg-indigo-500"></div>
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                   <span className="text-gray-500">ROAS Avg</span>
                   <span className="text-purple-400">x12.4</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="w-[70%] h-full bg-purple-500"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
