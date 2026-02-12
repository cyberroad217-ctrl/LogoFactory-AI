
import React from 'react';
import { Link } from 'react-router-dom';

const STRIPE_LINK = "https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="relative py-12 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-indigo-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-white text-[8px] font-black uppercase tracking-[0.2em] mb-6">
          Autonomous Brand Factory v4.2 is Live
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tighter uppercase leading-[0.85] italic">
          DESIGN <br/> <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">INFINITE</span>
        </h1>
        <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed font-medium">
          The Silicon Valley standard for automated branding. Our agents generate logos, cinematic intros, and verify legal safety while you scale.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/marketplace" className="px-8 py-3.5 bg-white text-black rounded-xl font-black text-lg shadow-2xl hover:scale-105 transition-all uppercase italic">
            Marketplace
          </Link>
          <Link to="/dashboard" className="px-8 py-3.5 glass border border-white/10 rounded-xl font-black text-lg hover:bg-white/5 transition-all uppercase italic">
            Command Center
          </Link>
        </div>
      </section>

      <section className="py-10 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: "Brand CRM", desc: "Automated license & usage tracking.", icon: "💼" },
            { title: "Ad-Tech Hub", desc: "AI social media creatives instantly.", icon: "📣" },
            { title: "Veo Studio", desc: "4K cinematic logo intro rendering.", icon: "🎬" },
            { title: "Voice Identity", desc: "TTS branding consistency node.", icon: "🎙️" },
            { title: "Legal Safety", desc: "Trademark collision detection.", icon: "⚖️" },
            { title: "Retail Hub", desc: "Instant high-res product mockups.", icon: "👕" }
          ].map((m, i) => (
            <div key={i} className="glass p-4 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{m.icon}</div>
              <h4 className="text-base font-black mb-0.5 uppercase italic tracking-tight">{m.title}</h4>
              <p className="text-[11px] text-gray-500 leading-tight">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Interactive Mockups", desc: "3D switching for apparel and mobile.", icon: "📱" },
              { title: "Voice Synthesizer", desc: "Generate distinct branding tones.", icon: "🔊" },
              { title: "Remix Engine", desc: "Proprietary geometric shape variants.", icon: "🧬" },
              { title: "Affiliate CRM", desc: "Autonomous global payout system.", icon: "📈" },
              { title: "Safety Score", desc: "Lexical uniqueness verification.", icon: "🛡️" },
              { title: "Geo Analyst", desc: "Market gap detection nodes.", icon: "📍" }
            ].map((f, i) => (
              <div key={i} className="flex gap-4 items-start glass p-4 rounded-3xl border border-white/5">
                <div className="text-2xl shrink-0">{f.icon}</div>
                <div>
                  <h4 className="text-base font-black uppercase italic mb-0.5 tracking-tight">{f.title}</h4>
                  <p className="text-gray-500 text-[11px] leading-tight">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-6 text-center">
        <div className="max-w-3xl mx-auto glass p-10 rounded-[2.5rem] border border-indigo-500/20 relative overflow-hidden">
          <h2 className="text-3xl font-black mb-3 uppercase italic tracking-tighter">Scale Your Agency</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto text-[13px] leading-relaxed">
            One payment unlocks lifetime access to our 24/7 autonomous agents. Research, legal-check, animate, and design instantly.
          </p>
          <a href={STRIPE_LINK} className="inline-block px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-black text-lg transition-all shadow-xl uppercase italic">
            Unlock Lifetime Access
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
