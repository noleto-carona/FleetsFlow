
import React from 'react';

const NavItem: React.FC<{ icon: string; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
    active 
      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 active-glow' 
      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
  }`}>
    <i className={`${icon} w-5 text-center`}></i>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col h-screen p-6 bg-[#080d14]">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
          <i className="fa-solid fa-ship text-white"></i>
        </div>
        <div>
          <h1 className="font-bold tracking-tight text-white leading-none">FLEET<span className="text-cyan-400">FLOW</span></h1>
          <p className="text-[10px] text-slate-500 font-mono">OPS COMMAND v4.2</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Navigation</p>
        <NavItem icon="fa-solid fa-table-columns" label="Dashboard" />
        <NavItem icon="fa-solid fa-shield-halved" label="Compliance" />
        <NavItem icon="fa-solid fa-cart-shopping" label="Marketplace" />
        <NavItem icon="fa-solid fa-right-left" label="Operations" active />
        <NavItem icon="fa-solid fa-leaf" label="ESG Metrics" />

        <div className="pt-8">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Logistics</p>
          <NavItem icon="fa-solid fa-network-wired" label="Network" />
          <NavItem icon="fa-solid fa-clock-rotate-left" label="Activity Log" />
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <img 
            src="https://picsum.photos/id/64/40/40" 
            className="w-10 h-10 rounded-full border border-slate-700" 
            alt="User" 
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Adm. Jensen</p>
            <p className="text-[10px] text-slate-500">Fleet Director</p>
          </div>
          <i className="fa-solid fa-gear text-slate-500 hover:text-white cursor-pointer transition-colors"></i>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
