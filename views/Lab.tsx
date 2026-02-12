
import React, { useState } from 'react';
import { Category, SocialPost, DomainSuggestion } from '../types';
import { 
  generateSocialCalendar, 
  brainstormDomainNames, 
  brandPersonaAudit, 
  generatePitchDeckOutline, 
  generateNewsletterDraft,
  generateColorRemixStrategy
} from '../services/geminiService';

const Lab: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState<Category>(Category.TECH);
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const runAgent = async (type: string) => {
    if (!brandName && type !== 'color') return;
    setLoading(type);
    setResult(null);
    try {
      let data;
      switch (type) {
        case 'social': data = await generateSocialCalendar(brandName, category); break;
        case 'domain': data = await brainstormDomainNames(brandName, category); break;
        case 'persona': data = await brandPersonaAudit(`${brandName} in ${category} sector`); break;
        case 'pitch': data = await generatePitchDeckOutline(brandName, "Revolutionizing branding."); break;
        case 'newsletter': data = await generateNewsletterDraft(brandName, "New interactive mockups."); break;
        case 'color': data = await generateColorRemixStrategy(category); break;
      }
      setResult({ type, data });
    } catch (e) {
      setResult({ type: 'error', data: 'Agent node offline.' });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">AI Brand Lab</h2>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-1">Direct Agent Neural Interaction Node</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 rounded-[2.5rem] border-white/5 space-y-5">
            <div>
              <label className="block text-[9px] font-black uppercase text-indigo-400 mb-2">Target Brand Name</label>
              <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="e.g. NovaStream" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase text-indigo-400 mb-2">Sector</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white outline-none">
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'social', label: 'Social', icon: '📅' },
              { id: 'domain', label: 'Domain', icon: '🌐' },
              { id: 'persona', label: 'Persona', icon: '👥' },
              { id: 'pitch', label: 'Pitch', icon: '📑' },
              { id: 'newsletter', label: 'Email', icon: '✉️' },
              { id: 'color', label: 'Color', icon: '🎨' },
            ].map(agent => (
              <button key={agent.id} onClick={() => runAgent(agent.id)} disabled={loading !== null} className={`flex flex-col items-center justify-center p-5 glass rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all ${loading === agent.id ? 'animate-pulse bg-indigo-500/10' : ''}`}>
                <span className="text-2xl mb-1">{agent.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{agent.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass h-[580px] rounded-[3rem] border-white/5 p-8 relative overflow-hidden flex flex-col">
            {!result && !loading && (
              <div className="flex-grow flex items-center justify-center text-center opacity-30">
                <div><div className="text-5xl mb-4">🤖</div><p className="text-sm font-black uppercase tracking-[0.2em]">Awaiting Command</p></div>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
                <div className="text-center"><div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-indigo-400 font-mono text-[9px] uppercase tracking-widest">Agent Thinking...</p></div>
              </div>
            )}
            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col h-full">
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">✨ Result Node</h3>
                <div className="flex-grow overflow-y-auto custom-scrollbar glass bg-black/40 border-white/5 rounded-2xl p-6">
                  {result.type === 'social' && (
                    <div className="space-y-4">
                      {(result.data as SocialPost[]).map((post, i) => (
                        <div key={i} className="border-b border-white/10 pb-4 last:border-0 text-[11px] leading-relaxed">
                          <div className="text-indigo-400 font-black uppercase tracking-widest mb-1">{post.day} // {post.platform}</div>
                          <p className="text-gray-300">{post.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {result.type === 'domain' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(result.data as DomainSuggestion[]).map((d, i) => (
                        <div key={i} className="glass p-4 rounded-xl border-white/5">
                          <div className="font-black text-white text-sm mb-0.5">{d.domain}</div>
                          <div className={`text-[7px] font-black uppercase tracking-widest ${d.availabilitySim === 'Available' ? 'text-emerald-400' : 'text-yellow-400'}`}>{d.availabilitySim}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {(result.type === 'pitch' || result.type === 'newsletter' || result.type === 'color' || result.type === 'persona') && (
                    <div className="whitespace-pre-wrap font-mono text-[11px] text-gray-400 leading-relaxed">
                      {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;
