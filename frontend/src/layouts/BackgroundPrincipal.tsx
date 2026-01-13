import React from 'react';
// @ts-ignore
import walterGif from '../assets/walter_effect3.gif';

interface BackgroundPrincipalProps {
  children?: React.ReactNode;
}

const BackgroundPrincipal: React.FC<BackgroundPrincipalProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#0a192f] text-[#ccd6f6] relative overflow-hidden font-sans">
      {/* Elementos de fundo sutis para dar profundidade (opcional, baseado na análise) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
         <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#64ffda] blur-[120px]" />
         <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#112240] blur-[120px]" />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full h-full">
        {children || (
          <div className="flex flex-col items-center justify-center h-screen">
            <img src={walterGif} alt="Effect" className="w-32 h-32 mb-4 object-contain" />
            <h1 className="text-6xl font-rockwell font-black text-[#ccd6f6] mb-4">
              Fleets<span className="text-[#64ffda]">Flow</span>
            </h1>
            <p className="text-xl text-[#8892b0] uppercase tracking-[0.2em] font-light">
              SITE EM CONSTRUÇÃO
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundPrincipal;
