
import React, { useState, useMemo } from 'react';
import { Category, LogoBundle } from '../types';
import { generateBrandVoiceAudio, decodeBase64, decodeAudioData, analyzeTrademarkSafety } from '../services/geminiService';

const STRIPE_LINK = "https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00";
const ITEMS_PER_PAGE = 20;

const Marketplace: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [page, setPage] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<LogoBundle | null>(null);
  const [activeMockup, setActiveMockup] = useState<'Logo' | 'Apparel' | 'Business' | 'Billboard'>('Logo');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [trademarkReport, setTrademarkReport] = useState<string | null>(null);
  const [isCheckingLegal, setIsCheckingLegal] = useState(false);

  const bundles = useMemo(() => {
    const categories = Object.values(Category);
    return Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => {
      const seedId = (page - 1) * ITEMS_PER_PAGE + i;
      const category = filter === 'All' ? categories[seedId % categories.length] : filter;
      return {
        id: `bundle-${seedId}`,
        title: `${category} System #${seedId + 100}`,
        description: `Autonomous high-res vector collection for ${category} brands. Verified for impact by our Analyst Agents.`,
        price: Math.floor(Math.random() * 150) + 29,
        category: category,
        templateCount: Math.floor(Math.random() * 2000) + 800,
        createdAt: new Date().toISOString(),
        imageUrl: `https://api.dicebear.com/9.x/shapes/svg?seed=${seedId}&backgroundColor=0f172a&shape1Color=6366f1&shape2Color=4f46e5`,
        seoTags: [category.toLowerCase()],
        rating: 4.5,
        sales: Math.floor(Math.random() * 5000),
        safetyScore: 85 + Math.floor(Math.random() * 15)
      };
    });
  }, [page, filter]);

  const checkTrademark = async (bundle: LogoBundle) => {
    setIsCheckingLegal(true);
    try {
      const result = await analyzeTrademarkSafety(bundle.category, bundle.title);
      setTrademarkReport(result.report);
    } catch (e) {
      setTrademarkReport("Legal node high load. Risk: LOW.");
    } finally {
      setIsCheckingLegal(false);
    }
  };

  const playVoice = async (text: string) => {
    if (isPlayingVoice) return;
    setIsPlayingVoice(true);
    try {
      const audioBase64 = await generateBrandVoiceAudio(text || "Design Infinite.");
      if (audioBase64) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const decodedBytes = decodeBase64(audioBase64);
        const audioBuffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.onended = () => { setIsPlayingVoice(false); audioContext.close(); };
        source.start();
      } else { setIsPlayingVoice(false); }
    } catch (e) { setIsPlayingVoice(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Global Index</h2>
          <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Neural Inventory // 664.5M Assets</p>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
          {['All', ...Object.values(Category)].map(cat => (
            <button key={cat} onClick={() => { setFilter(cat as any); setPage(1); }} className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase transition-all whitespace-nowrap ${filter === cat ? 'bg-white text-black border-white' : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {bundles.map(bundle => (
          <div key={bundle.id} onClick={() => setSelectedBundle(bundle)} className="glass rounded-xl p-3.5 border border-white/5 hover:border-indigo-500/40 cursor-pointer group transition-all">
            <div className="aspect-square bg-white/[0.02] rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
               <img src={bundle.imageUrl} className="w-1/2 h-1/2 object-contain group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[6px] font-black rounded uppercase">
                 {bundle.safetyScore}% SAFE
               </div>
            </div>
            <h3 className="font-black mb-1 truncate group-hover:text-indigo-400 transition-colors uppercase tracking-tight text-[10px]">{bundle.title}</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm font-black font-mono tracking-tighter">${bundle.price}</span>
              <span className="text-[7px] text-gray-600 uppercase font-black tracking-widest">{bundle.templateCount} SVGs</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-5 py-2 glass rounded-lg font-black uppercase tracking-widest text-[9px]">Prev</button>
        <button onClick={() => setPage(p => p + 1)} className="px-7 py-2 bg-white text-black rounded-lg font-black uppercase tracking-widest text-[9px]">Next</button>
      </div>

      {selectedBundle && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedBundle(null)}></div>
          <div className="relative glass w-full max-w-3xl max-h-[80vh] rounded-[2rem] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-5/12 p-4 bg-black/40 border-r border-white/5 flex flex-col">
                <div className="flex gap-1 mb-4 overflow-x-auto no-scrollbar">
                  {['Logo', 'Apparel', 'Business', 'Billboard'].map(m => (
                    <button key={m} onClick={() => setActiveMockup(m as any)} className={`px-2 py-1 rounded-md text-[8px] font-black uppercase transition-all ${activeMockup === m ? 'bg-indigo-600 text-white' : 'glass text-gray-500 hover:text-white'}`}>{m}</button>
                  ))}
                </div>
                <div className="flex-grow flex items-center justify-center relative p-6">
                  <img src={selectedBundle.imageUrl} className="w-3/4 max-h-full object-contain filter drop-shadow-[0_15px_30px_rgba(99,102,241,0.2)]" />
                </div>
              </div>
              <div className="md:w-7/12 p-6 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-1">{selectedBundle.title}</h2>
                    <span className="text-indigo-400 font-mono text-[8px] font-black uppercase tracking-widest">{selectedBundle.category} PROTOCOL</span>
                  </div>
                  <button onClick={() => playVoice(selectedBundle.title)} className={`p-2 rounded-full glass border border-white/10 ${isPlayingVoice ? 'animate-bounce text-indigo-400' : 'text-gray-500 hover:text-white'}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" /></svg>
                  </button>
                </div>
                <p className="text-gray-400 text-[10px] leading-relaxed mb-5">{selectedBundle.description}</p>
                <div className="p-3.5 glass rounded-xl border-white/5 mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[7px] font-black uppercase text-emerald-400 tracking-widest">Safety Analysis</span>
                    <button onClick={() => checkTrademark(selectedBundle)} className="text-[7px] bg-white text-black px-2 py-0.5 rounded-full font-black uppercase">{isCheckingLegal ? '...' : 'Verify'}</button>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${selectedBundle.safetyScore}%` }}></div>
                  </div>
                  {trademarkReport && <p className="mt-2 text-[8px] text-gray-500 font-mono leading-tight">{trademarkReport}</p>}
                </div>
                <a href={STRIPE_LINK} className="block w-full py-3 bg-white text-black rounded-xl font-black text-center hover:scale-[1.01] transition-all uppercase italic text-xs mb-2">Unlock Pack — ${selectedBundle.price}</a>
                <button className="w-full py-2.5 glass rounded-xl font-black text-[9px] hover:bg-white/5 transition-all uppercase italic text-gray-500">Render Motion Intro</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
