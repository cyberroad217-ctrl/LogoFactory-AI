
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Marketplace from './views/Marketplace';
import Dashboard from './views/Dashboard';
import Blog from './views/Blog';
import Lab from './views/Lab';
import LiveGallery from './views/LiveGallery';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/live-gallery" element={<LiveGallery />} />
          </Routes>
        </main>
        <footer className="py-12 border-t border-white/10 glass text-center text-gray-400">
          <p>© 2024 LogoFactory AI. Autonomous Design Engine powered by Gemini.</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
