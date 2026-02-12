
import React, { useState, useEffect, useRef } from 'react';
import { Category, LiveLogo, AgentActivity } from '../types.ts';
import { generateLiveLogoThinking } from '../services/geminiService.ts';

const AGENTS = ['Zeta-Node', 'Vector-Core', 'Design-Alpha-9', 'Omni-Gen', 'Poly-Bot', 'Prism-AIG', 'Neural-Flux', 'Logic-Gate', 'Vertex-6', 'Synth-Arch'];
const STYLES = ['Cyberpunk', 'Solar-Punk', 'Brutalist', 'Swiss-Modern', 'Neo-Luxury', 'Street-Pop', 'Monochrome', 'Glassmorphism', 'Techno-Organic', 'Minimal-Chic'];

const LiveGallery: React.FC = () => {
  const [logos, setLogos] = useState<LiveLogo[]>([]);
  const [logs, setLogs] = useState<AgentActivity[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<LiveLogo | null>(null);
  const [genCount, setGenCount] = useState(664557442);

  useEffect(() => {
    // Initial batch
    const initialLogos: LiveLogo[] = Array.from({ length: 24 }).map(() => createRandomLogo());
    setLogos(initialLogos);

    const interval = setInterval(() => {
      if (!isPaused) {
        addNewLogo();
        setGenCount(prev => prev + Math.floor(Math.random() * 8) + 1);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const createRandomLogo = (): LiveLogo => {
    const id = Math.random().toString(36).substr(2, 9).toUpperCase();
    const categories = Object.values(Category);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
    const style = STYLES[Math.floor(Math.random() * STYLES.length)];
    return {
      id,
      seed: id,
      style,
      agent,
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      category,
      complexity: Math.floor(Math.random() * 60) + 40,
    };
  };

  const addNewLogo = async () => {
    const newLogo = createRandomLogo();
    setLogos(prev => [newLogo, ...prev.slice(0, 59)]);
    
    try {
      const thinking = await generateLiveLogoThinking(newLogo.agent);
      const newLog: AgentActivity = {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        message: `[CLUSTER] ${newLogo.agent}: Synthesis of '${newLogo.style}' variant for ${newLogo.category}. Logic: ${thinking}`,
        status: 'success',
        agentName: newLogo.agent as any,
      };
      setLogs(prev => [newLog, ...prev.slice(0, 30)]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/[0.04] blur-[220px] pointer-events-none rounded-full"></div>
      
      <header className="px-6 py-6 glass border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
             <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">
               AGI <span className="text-gray-500">LIVE</span>
             </h2>
          </div>
          <p className="text-gray-600 font-mono text-[8px] tracking-[0.3em] uppercase">{genCount.toLocaleString()} Synthesized</p>
        </div>
        <button 
          onClick={() => setIsPaused(!isPaused)} 
          className={`px-6 py-2.5 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all flex items-center gap-2 ${isPaused ? 'bg-indigo-600 text-white' : 'glass border-white/10 text-gray-400 hover:text-white'}`}
        >
          {isPaused ? '▶ Resume Stream' : '⏸ Pause Neural Sync'}
        </button>
      </header>

      <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
        <div className="flex-grow overflow-y-auto custom-scrollbar p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {logos.map((logo, i) => (
              <button 
                key={logo.id} 
                onClick={() => setSelectedLogo(logo)}
                className="group relative text-left animate-in zoom-in-95 fade-in duration-500"
              >
                <div className="glass rounded-xl p-3.5 border border-white/5 hover:border-indigo-500/50 transition-all transform group-hover:-translate-y-1">
                  <div className="aspect-square bg-black/50 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden border border-white/5">
                    <img 
                      src={`https://api.dicebear.com/9.x/shapes/svg?seed=${logo.seed}&backgroundColor=0f172a&shape1Color=6366f1&shape2Color=4f46e5`} 
                      className="w-1/2 h-1/2 object-contain group-hover:scale-110 transition-transform duration-700" 
                      alt="AI Logo"
                    />
                    <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[6px] font-mono text-gray-500 border border-white/10 uppercase tracking-widest">
                      ID-{logo.id.slice(0,4)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-widest text-gray-600">
                      <span>{logo.agent}</span>
                      <span>{logo.timestamp}</span>
                    </div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-tight truncate italic">{logo.style}</h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="lg:w-[320px] bg-[#020617]/90 border-l border-white/5 backdrop-blur-3xl flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white italic">Agent Terminal</span>
             <span className="text-[8px] font-mono text-gray-600">0x99FF</span>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-4">
            {logs.map(log => (
              <div key={log.id} className="border-l border-white/10 pl-3 py-0.5 space-y-1">
                <div className="flex justify-between items-center text-[7px] font-mono text-gray-600 uppercase tracking-widest">
                  <span>{log.timestamp}</span>
                  <span className="text-indigo-400 font-black italic">{log.agentName}</span>
                </div>
                <p className="text-[9px] text-gray-400 leading-tight font-medium">
                  {log.message}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* TIGHT DETAIL MODAL */}
      {selectedLogo && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedLogo(null)}></div>
          <div className="relative glass w-full max-w-xs rounded-2xl p-6 border border-white/10 shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedLogo(null)}
              className="absolute top-4 right-4 p-1.5 bg-white/5 rounded-full hover:bg-white/10 text-gray-500 transition-all border border-white/5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="aspect-square w-24 h-24 mx-auto mb-4 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 shadow-inner">
              <img 
                src={`https://api.dicebear.com/9.x/shapes/svg?seed=${selectedLogo.seed}&backgroundColor=0f172a&shape1Color=6366f1&shape2Color=4f46e5`} 
                className="w-3/5 h-3/5 object-contain filter drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                alt="Logo Preview"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-black uppercase italic tracking-tighter leading-none mb-1">
                {selectedLogo.style}
              </h3>
              <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[8px] mb-2 italic">
                {selectedLogo.category} Node
              </p>
              <div className="text-[9px] text-gray-500 font-medium leading-relaxed px-2">
                ID: {selectedLogo.id} // Synthesized by {selectedLogo.agent}. Optimal for {selectedLogo.category.toLowerCase()} branding.
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button className="w-full py-2.5 bg-white text-black rounded-lg font-black uppercase tracking-widest text-[9px] hover:bg-gray-200 transition-all italic">Download SVG</button>
              <button className="w-full py-2.5 glass rounded-lg border-white/10 hover:bg-white/5 transition-all text-[8px] font-black uppercase text-gray-500 italic">Inspect Vector Nodes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveGallery;
