import React from 'react';

interface BackgroundPrincipalProps {
  children?: React.ReactNode;
}

const BackgroundPrincipal: React.FC<BackgroundPrincipalProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#0a192f] text-[#ccd6f6] relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboard-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0a192f]/70" />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full h-full p-8">
        {children || (
          <div className="w-full h-full relative overflow-hidden">
            {/* O painel central está vazio por enquanto, pronto para receber os widgets da dashboard */}
            
            {/* Efeito de brilho nos cantos */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#64ffda]/5 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#64ffda]/5 blur-3xl rounded-full pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundPrincipal;
