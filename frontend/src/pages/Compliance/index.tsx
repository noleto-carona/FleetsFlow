import React, { useState } from 'react';
import { Building2, Anchor, Users } from 'lucide-react';
import ComplianceSectionEmpresa from './components/ComplianceSectionEmpresa';
import ComplianceSectionEmbarcacoes from './components/ComplianceSectionEmbarcacoes';
import ComplianceSectionTripulacao from './components/ComplianceSectionTripulacao';

const CompliancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'empresa' | 'embarcacoes' | 'tripulacao'>('empresa');

  return (
    <div className="w-full h-full min-h-[calc(100vh-104px)] bg-[#0a192f] p-[32px] text-[#ccd6f6]">
      <div className="flex justify-between items-end mb-[32px] border-b border-[#233554] pb-[16px]">
        <div>
          <h1 className="text-[28px] font-bold text-[#ccd6f6] mb-[8px]">Compliance Antecipado</h1>
          <p className="text-[14px] text-[#8892b0]">
            Gerencie documentos e certificações para garantir sua chave operacional.
          </p>
        </div>

        <div className="flex items-center gap-[12px]">
          <span className="text-[12px] text-[#8892b0] uppercase tracking-wider">Status Geral</span>
          <div className="flex items-center gap-[8px] bg-[#112240] px-[12px] py-[6px] rounded border border-[#233554]">
            <div className="w-[8px] h-[8px] rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[14px] font-medium text-yellow-500">Em Análise</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[4px] mb-[32px]">
        <button
          onClick={() => setActiveTab('empresa')}
          className={`
            flex items-center gap-[8px] px-[24px] py-[12px] rounded-t-lg transition-all duration-300 border-b-2
            ${activeTab === 'empresa' 
              ? 'bg-[#112240] text-[#64ffda] border-[#64ffda]' 
              : 'text-[#8892b0] border-transparent hover:text-[#64ffda] hover:bg-[#112240]/50'
            }
          `}
        >
          <Building2 className="w-[18px] h-[18px]" />
          <span className="font-medium text-[14px]">Empresa</span>
        </button>

        <button
          onClick={() => setActiveTab('embarcacoes')}
          className={`
            flex items-center gap-[8px] px-[24px] py-[12px] rounded-t-lg transition-all duration-300 border-b-2
            ${activeTab === 'embarcacoes' 
              ? 'bg-[#112240] text-[#64ffda] border-[#64ffda]' 
              : 'text-[#8892b0] border-transparent hover:text-[#64ffda] hover:bg-[#112240]/50'
            }
          `}
        >
          <Anchor className="w-[18px] h-[18px]" />
          <span className="font-medium text-[14px]">Embarcações</span>
        </button>

        <button
          onClick={() => setActiveTab('tripulacao')}
          className={`
            flex items-center gap-[8px] px-[24px] py-[12px] rounded-t-lg transition-all duration-300 border-b-2
            ${activeTab === 'tripulacao' 
              ? 'bg-[#112240] text-[#64ffda] border-[#64ffda]' 
              : 'text-[#8892b0] border-transparent hover:text-[#64ffda] hover:bg-[#112240]/50'
            }
          `}
        >
          <Users className="w-[18px] h-[18px]" />
          <span className="font-medium text-[14px]">Equipe de Operação</span>
        </button>
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'empresa' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ComplianceSectionEmpresa />
          </div>
        )}

        {activeTab === 'embarcacoes' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ComplianceSectionEmbarcacoes />
          </div>
        )}

        {activeTab === 'tripulacao' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ComplianceSectionTripulacao />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompliancePage;
