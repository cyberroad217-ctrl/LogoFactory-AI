
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  const sections = [
    {
      title: "Core Ecosystem",
      links: [
        { name: 'Home Command', path: '/', desc: 'Primary node overview', icon: '🏠' },
        { name: 'Global Index', path: '/marketplace', desc: '664M+ vector assets', icon: '🌍' },
        { name: 'AGI Live Stream', path: '/live-gallery', desc: 'Real-time neural synthesis', icon: '🔴', isLive: true },
        { name: 'Brand CRM', path: '/dashboard', desc: 'Seat & license management', icon: '💼' },
      ]
    },
    {
      title: "AI Agent Tools",
      links: [
        { name: 'Brand Lab', path: '/lab', desc: 'Direct agent interaction', icon: '🧪' },
        { name: 'Legal-Check Bot', path: '/marketplace', desc: 'Trademark safety audit', icon: '⚖️' },
        { name: 'Ad-Tech Engine', path: '/dashboard', desc: 'Auto-creative generation', icon: '📣' },
        { name: 'Voice Identity', path: '/marketplace', desc: 'TTS synthesis node', icon: '🎙️' },
        { name: 'Vector Remixing', path: '/lab', desc: 'Geometric variation engine', icon: '🧬' },
        { name: 'Pitch Deck Gen', path: '/lab', desc: 'Narrative flow synthesis', icon: '📑' },
      ]
    },
    {
      title: "Advanced Features",
      links: [
        { name: 'Affiliate CRM', path: '/dashboard', desc: 'Global partner network', icon: '📈' },
        { name: 'Geo-Analyst', path: '/dashboard', desc: 'Market gap detection', icon: '📍' },
        { name: 'Newsletter Hub', path: '/lab', desc: 'Automated outreach', icon: '✉️' },
        { name: 'Veo Motion Studio', path: '/marketplace', desc: '4K intro rendering', icon: '🎬' },
        { name: 'Design Intel', path: '/blog', desc: 'Autonomous research', icon: '🧠' },
        { name: 'Admin Command', path: '/dashboard', desc: 'Master cluster controls', icon: '🛠️' },
      ]
    },
    {
      title: "Technical Nodes",
      links: [
        { name: 'API Reference', path: '/dashboard', desc: 'v4.2 protocol docs', icon: '🔌' },
        { name: 'Billing/Stripe', path: '/', desc: 'Financial sync', icon: '💳' },
        { name: 'Documentation', path: '/blog', desc: 'Architecture logs', icon: '📖' },
        { name: 'Ecosystem Status', path: '/dashboard', desc: 'Cluster health metrics', icon: '📡' },
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[100] glass border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center font-bold text-white shadow-lg group-hover:rotate-12 transition-transform text-xs">
          LF
        </div>
        <span className="text-base font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          LogoFactory AI
        </span>
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 glass rounded-full border-white/5 cursor-default">
           <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
           <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">Nodes: Optimal</span>
        </div>
        
        <button 
          onClick={toggleMenu}
          className="flex flex-col gap-1.5 p-2 focus:outline-none group z-[110]"
          aria-label="Menu"
        >
          <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
          <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4 self-end'}`}></span>
          <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`}></span>
        </button>
      </div>

      <div className={`fixed inset-0 bg-[#030712]/98 backdrop-blur-3xl transition-all duration-500 z-[105] overflow-y-auto custom-scrollbar ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="min-h-screen py-12 px-6 max-w-6xl mx-auto flex flex-col">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none">COMMAND CENTER</h2>
              <p className="text-gray-500 font-mono text-[9px] tracking-[0.4em] uppercase mt-2">Secure Handshake v4.2.0-Alpha</p>
            </div>
            <button onClick={toggleMenu} className="text-gray-500 hover:text-white font-black uppercase text-[10px] tracking-widest px-4 py-2 glass rounded-full border-white/10 transition-all">Close Esc</button>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sections.map((section, idx) => (
              <div key={section.title} className="space-y-5">
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500 border-b border-white/5 pb-2.5">{section.title}</h3>
                <div className="space-y-1.5">
                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`group flex flex-col p-3.5 glass rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-white/[0.02] ${isActive(link.path) ? 'bg-indigo-600/5 border-indigo-500/20' : ''}`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">{link.name}</span>
                          {link.isLive && <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>}
                        </div>
                      </div>
                      <p className="text-[8px] text-gray-600 font-medium uppercase tracking-tight group-hover:text-gray-400 leading-tight">{link.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[8px] font-mono text-gray-700 uppercase tracking-widest">
            <div className="flex gap-6">
               <span>Uptime: 99.999%</span>
               <span>Latency: 12ms</span>
               <span>Auth: Encrypted</span>
            </div>
            <button className="px-5 py-2.5 glass border border-white/5 rounded-full hover:bg-white/5 transition-all text-gray-500 hover:text-white">Node Health Report</button>
          </footer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
