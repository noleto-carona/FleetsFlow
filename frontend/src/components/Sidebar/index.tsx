import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingCart, 
  Anchor, 
  Leaf, 
  LineChart, 
  User,
  LogOut
} from 'lucide-react';
import hoverSound from '../../audio/ui-click-menu-modern-interface-select-small-01-230473.mp3';

const Sidebar: React.FC = () => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.2; // Volume suave para interface
      audioRef.current.play().catch(() => {});
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Compliance', path: '/compliance' },
    { icon: ShoppingCart, label: 'Marketplace', path: '/marketplace' },
    { icon: Anchor, label: 'Operações', path: '/operacoes' },
    { icon: Leaf, label: 'ESG', path: '/esg' },
    { icon: LineChart, label: 'Predições', path: '/predicoes' }, // Assumindo "Pedrações" = Predições
    { icon: User, label: 'Perfil', path: '/perfil' },
  ];

  return (
    <div className="w-64 bg-[#112240]/90 backdrop-blur-md border-r border-[#233554] flex flex-col fixed left-0 top-[104px] bottom-0 z-40">
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onMouseEnter={playHoverSound}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
              ${isActive 
                ? 'bg-[#64ffda]/10 text-[#64ffda] border-r-2 border-[#64ffda]' 
                : 'text-[#8892b0] hover:bg-[#64ffda]/5 hover:text-[#64ffda]'
              }
            `}
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-medium tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / User */}
      <div className="p-4 border-t border-[#233554]/50">
        <button 
          onMouseEnter={playHoverSound}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[#8892b0] hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>

      <audio ref={audioRef} src={hoverSound} preload="auto" />
    </div>
  );
};

export default Sidebar;
