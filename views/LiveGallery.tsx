
import React, { useState, useEffect, useRef } from 'react';
import { Category, LiveLogo, AgentActivity } from '../types';
import { generateLiveLogoThinking } from '../services/geminiService';

const AGENTS = ['Zeta-Node', 'Vector-Core', 'Design-Alpha-9', 'Omni-Gen', 'Poly-Bot', 'Prism-AIG', 'Neural-Flux', 'Logic-Gate', 'Vertex-6', 'Synth-Arch'];
const STYLES = ['Cyberpunk', 'Solar-Punk', 'Brutalist', 'Swiss-Modern', 'Neo-Luxury', 'Street-Pop', 'Monochrome', 'Glassmorphism', 'Techno-Organic', 'Minimal-Chic'];

const LiveGallery: React.FC = () => {
  const [logos, setLogos] = useState<LiveLogo[]>([]);
  const [logs, setLogs] = useState<AgentActivity[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<LiveLogo | null>(null);
  const [genCount, setGenCount] = useState(664557442);

  useEffect(() => {
    // Initial batch of 24
    const initialLogos: LiveLogo[] = Array.from({ length: 24 }).map((_, i) => createRandomLogo());
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
    const category = Object.values(Category)[Math.floor(Math.random() * Object.values(Category).length)];
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
    const style = STYLES[Math.floor(Math.random() * STYLES.length)];
    return {
      id,
      seed: id,
      style,
      agent,
      timestamp: new Date().toLocaleTimeString(),
      category,
      complexity: Math.floor(Math.random() * 60) + 40,
    };
  };

  const addNewLogo = async () => {
    const newLogo = createRandomLogo();
    setLogos(prev => [newLogo, ...prev.slice(0, 59)]); // Keep last 60
    
    // Add logic log with Gemini-driven "thinking"
    try {
      const thinking = await generateLiveLogoThinking(newLogo.agent);
      const newLog: AgentActivity = {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        message: `[AGENT CLUSTER] ${newLogo.agent}: Executing synthesis of '${newLogo.style}' variant for ${newLogo.category}. Logic: ${thinking}`,
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
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/[0.04] blur-[220px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/[0.04] blur-[200px] pointer-events-none rounded-full"></div>

      <header className="px-6 md:px-12 py-8 glass border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 z-20">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping shadow-[0_0_15px_rgba(220,38,38,0.9)]"></div>
             <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
               AGI <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">NONSTOP</span>
             </h2>
          </div>
          <p className="text-gray-500 font-mono text-[9px] tracking-[0.4em] uppercase">Ecosystem // {genCount.toLocaleString()} Synthesized</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden xl:flex flex-col items-end">
             <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">Saturation</span>
             <span className="text-xl font-black text-indigo-400 font-mono tracking-tighter">0.82 TB/Sec</span>
          </div>
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            className={`px-8 py-3.5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center gap-3 shadow-2xl ${isPaused ? 'bg-indigo-600 text-white shadow-indigo-600/30' : 'glass border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            {isPaused ? (
              <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg> Resume</>
            ) : (
              <><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Streaming Live</>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-0 flex-grow overflow-hidden z-10">
        {/* Main Grid View */}
        <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10 pb-40">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7 gap-6">
            {logos.map((logo, i) => (
              <button 
                key={logo.id} 
                onClick={() => setSelectedLogo(logo)}
                className="group relative text-left transition-all duration-700 animate-in zoom-in-95 fade-in"
              >
                <div className="glass rounded-2xl p-5 border border-white/5 hover:border-indigo-500/50 transition-all transform group-hover:-translate-y-2 bg-white/[0.01] shadow-xl">
                  <div className="aspect-square bg-black/50 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
                    <img 
                      src={`https://api.dicebear.com/9.x/shapes/svg?seed=${logo.seed}&backgroundColor=0f172a&shape1Color=6366f1&shape2Color=4f46e5`} 
                      className="w-1/2 h-1/2 object-contain group-hover:scale-110 transition-all duration-1000" 
                      alt="AI Logo Template"
                    />
                    {i === 0 && !isPaused && (
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-indigo-600/95 backdrop-blur-2xl text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg border border-white/20 shadow-2xl">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                        New
                      </div>
                    )}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/95 backdrop-blur-3xl px-2 py-0.5 rounded-md text-[8px] font-mono text-gray-500 border border-white/10 uppercase tracking-widest">
                      ID-{logo.id.slice(0,4)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center opacity-50">
                      <span className="text-indigo-400 font-black text-[9px] uppercase tracking-[0.3em] italic">{logo.agent}</span>
                      <span className="text-gray-500 font-mono text-[8px]">{logo.timestamp}</span>
                    </div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-tight truncate leading-none italic">{logo.style}</h4>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 animate-gradient-x" 
                        style={{ width: `${logo.complexity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-2 bg-indigo-600/10 blur-2xl rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Side Terminal View */}
        <aside className="lg:w-[400px] shrink-0 bg-[#020617]/90 border-l border-white/5 backdrop-blur-3xl flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.6)]">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.03]">
             <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
               <span className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Agent Core</span>
             </div>
             <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Buffer: 0x99FF</div>
          </div>
          
          <div className="flex-grow overflow-y-auto custom-scrollbar p-8 space-y-6">
            {logs.map(log => (
              <div key={log.id} className="border-l-[2px] border-indigo-500/30 pl-4 py-1.5 space-y-2 group hover:border-indigo-500 transition-all animate-in fade-in slide-in-from-right-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-gray-600 font-mono tracking-widest">{log.timestamp}</span>
                  <span className="text-indigo-400 font-black uppercase text-[9px] tracking-[0.2em] italic">{log.agentName}</span>
                </div>
                <p className="text-[11px] text-gray-400 group-hover:text-gray-100 transition-colors leading-relaxed font-medium">
                  {log.message}
                </p>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-center py-40">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Handshake...</p>
              </div>
            )}
          </div>

          <div className="p-8 border-t border-white/5 bg-indigo-600/[0.04]">
            <h5 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.3em] mb-4 italic">Cluster Integrity</h5>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                  <span className="text-gray-500 italic">Neural Cohesion</span>
                  <span className="text-emerald-400">99.8%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-emerald-500 w-[99.8%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
              <p className="text-[9px] text-gray-600 leading-tight font-mono uppercase tracking-tighter">
                AGI Mesh is training on real-time visual streams for hyper-contextual synthesis.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* COMPACT Detail Modal */}
      {selectedLogo && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-[60px]" onClick={() => setSelectedLogo(null)}></div>
          <div className="relative glass w-full max-w-xl rounded-3xl p-10 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] text-center animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setSelectedLogo(null)}
              className="absolute top-6 right-6 p-3 bg-white/5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-all border border-white/10"
              aria-label="Close Preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="aspect-square w-40 h-40 mx-auto mb-8 bg-black/60 rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl relative">
              <div className="absolute inset-0 bg-indigo-600/5 blur-[20px] rounded-full"></div>
              <img 
                src={`https://api.dicebear.com/9.x/shapes/svg?seed=${selectedLogo.seed}&backgroundColor=0f172a&shape1Color=6366f1&shape2Color=4f46e5`} 
                className="relative w-3/4 h-3/4 object-contain filter drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                alt="Enlarged Vector Preview"
              />
            </div>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4 leading-none">
               {selectedLogo.style} <span className="text-indigo-500">{selectedLogo.category}</span>
            </h3>
            <p className="text-gray-400 mb-10 font-medium text-xs leading-relaxed max-w-sm mx-auto">
              Synthesized by agent <span className="text-indigo-400 font-black italic tracking-[0.2em]">{selectedLogo.agent}</span>. Ready for immediate deployment across digital and physical infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-grow py-4 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-xl italic">Download Production SVG</button>
              <button className="px-6 py-4 glass rounded-xl border-white/10 hover:bg-white/5 transition-all hover:scale-105 active:scale-95 group">
                <svg className="w-5 h-5 text-indigo-400 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveGallery;
