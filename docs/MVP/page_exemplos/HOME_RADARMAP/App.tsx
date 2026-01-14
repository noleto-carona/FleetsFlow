
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RadarMap from './components/RadarMap';
import StatCard from './components/StatCard';
import { getVesselIntel } from './services/geminiService';
import { SearchResult } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResult, setAiResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const speedData = [
    { val: 40 }, { val: 45 }, { val: 55 }, { val: 65 }, { val: 80 }, { val: 90 }, { val: 85 }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    const result = await getVesselIntel(searchQuery);
    setAiResult(result);
    setIsSearching(false);
  };

  return (
    <div className="flex h-screen w-screen bg-[#050a0f] text-slate-200">
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#080d14]/80 backdrop-blur-md z-10">
          <form onSubmit={handleSearch} className="relative w-1/3">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input 
              type="text" 
              placeholder="Vessel Search (Name, IMO, MMSI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </form>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-cyan-500/40 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/10 transition-colors">
              <i className="fa-solid fa-rotate"></i>
              Refresh Data
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full ml-1 animate-pulse"></span>
            </button>
            <div className="relative">
              <i className="fa-solid fa-bell text-slate-500 text-lg hover:text-white cursor-pointer transition-colors"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#080d14]"></span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative">
          <RadarMap />

          {/* Warning Banner */}
          {showAlert && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[500px] flex items-stretch border-l-4 border-l-red-500 glass-panel shadow-2xl z-20">
              <div className="bg-red-500/20 p-4 flex items-center">
                <i className="fa-solid fa-triangle-exclamation text-red-500 text-xl"></i>
              </div>
              <div className="p-4 flex-1">
                <h3 className="font-bold text-sm tracking-tight text-white uppercase">Restricted Zone Entry Warning</h3>
                <p className="text-xs text-slate-400">Vessel <span className="text-white font-bold">AURORA-IX</span> entering North Buffer in 24m 12s.</p>
              </div>
              <button 
                onClick={() => setShowAlert(false)}
                className="px-4 text-slate-500 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}

          {/* Right Side Stats */}
          <div className="absolute top-8 right-8 space-y-4 w-72 z-10">
            <StatCard 
              label="Cruising Speed" 
              value="12.5" 
              unit="Knots" 
              subValue="+0.2 Var" 
              chartData={speedData}
            />
            <StatCard 
              label="Course Heading" 
              value="045°" 
              unit="North East" 
            />
            <StatCard 
              label="Arrival Target" 
              value="15.4" 
              unit="KM to Port" 
            />
          </div>

          {/* AI Insights Modal (Search Result) */}
          {aiResult && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8 z-50 animate-in fade-in duration-300">
              <div className="glass-panel w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                  <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-3">
                    <i className="fa-solid fa-microchip"></i>
                    Vessel Intelligence: {searchQuery}
                  </h2>
                  <button onClick={() => setAiResult(null)} className="text-slate-400 hover:text-white">
                    <i className="fa-solid fa-xmark text-xl"></i>
                  </button>
                </div>
                <div className="p-8 overflow-y-auto text-sm leading-relaxed text-slate-300">
                  <p className="mb-6 whitespace-pre-wrap">{aiResult.text}</p>
                  
                  {aiResult.links.length > 0 && (
                    <div className="mt-8 border-t border-slate-800 pt-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Sources & Grounding</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {aiResult.links.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.web?.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all group"
                          >
                            <i className="fa-solid fa-link text-cyan-500 text-xs"></i>
                            <span className="truncate text-[11px] font-medium group-hover:text-cyan-400">
                              {link.web?.title || 'External Report'}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Searching Overlay */}
          {isSearching && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                <p className="text-sm font-mono text-cyan-400 animate-pulse">Accessing Fleet Database...</p>
              </div>
            </div>
          )}

          {/* Bottom Toolbar */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10">
            <div className="flex items-center gap-1 p-1 glass-panel rounded-lg">
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-slate-400 hover:text-white"><i className="fa-solid fa-plus text-xs"></i></button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-slate-400 hover:text-white"><i className="fa-solid fa-minus text-xs"></i></button>
              <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-slate-400 hover:text-white"><i className="fa-solid fa-layer-group text-xs"></i></button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-cyan-400"><i className="fa-solid fa-cube text-xs"></i></button>
            </div>

            <div className="flex items-center gap-4 glass-panel px-4 py-2 rounded-lg">
              <div className="flex -space-x-2">
                <img src="https://picsum.photos/id/1/24/24" className="w-6 h-6 rounded-full border-2 border-slate-900" />
                <img src="https://picsum.photos/id/2/24/24" className="w-6 h-6 rounded-full border-2 border-slate-900" />
                <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operators Online</span>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Encryption Active</span>
              </div>
              <p className="text-[10px] font-mono text-slate-500">GLOBAL TERMINAL SECURE // 40.7128° N, 74.0060° W</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
