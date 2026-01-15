import React from 'react';
// @ts-ignore
import walterGif from '../../assets/walter_effect3.gif';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[104px] bg-[#112240]/90 backdrop-blur-md border-b border-[#233554] z-50 flex items-center">
      {/* Logo Area - Mantendo a largura da Sidebar (w-64) para alinhamento */}
      <div className="w-64 h-full flex flex-row items-center justify-center gap-3 border-r border-[#233554]/50">
        <img src={walterGif} alt="FleetsFlow Icon" className="w-14 h-14 object-contain" />
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-rockwell font-black text-[#ccd6f6]">
            Fleets<span className="text-[#64ffda]">Flow</span>
          </h1>
          <span className="text-[9px] font-bold text-[#8892b0] font-arial tracking-wider uppercase">
            Tecnological Service
          </span>
        </div>
      </div>

      {/* Área restante do Header (pode adicionar breadcrumbs, perfil, notificações aqui depois) */}
      <div className="flex-1 px-6">
        {/* Espaço para expansão futura */}
      </div>
    </header>
  );
};

export default Header;
