import React, { useState } from 'react';
import { Anchor, FileText, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { DocStatus, DocTipo } from '../../../types';

// Mock Data
const mockEmbarcacoes = [
  { id: 1, nome: 'AURORA-IX', tipo: 'Empurrador', status: 'critical' },
  { id: 2, nome: 'OCEAN-TRACER', tipo: 'Barcaça', status: 'normal' },
  { id: 3, nome: 'SEAWING-2', tipo: 'Empurrador', status: 'warning' },
];

const mockCertificados = [
  { id: 101, tipo: DocTipo.TIE, status: DocStatus.VALIDADO, dataValidade: '2028-05-10' },
  { id: 102, tipo: DocTipo.CSN, status: DocStatus.EXPIRADO, dataValidade: '2023-12-01' },
  { id: 103, tipo: DocTipo.SEGURO_OBRIGATORIO, status: DocStatus.PENDENTE, dataValidade: null },
];

const ComplianceSectionEmbarcacoes: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(mockEmbarcacoes[0].id);

  return (
    <div className="flex gap-[24px] h-[600px]">
      {/* Sidebar Lista de Embarcações */}
      <div className="w-[320px] bg-[#0a192f]/50 border border-[#233554] rounded-lg flex flex-col">
        <div className="p-[16px] border-b border-[#233554]">
          <div className="relative">
            <Search className="absolute left-[12px] top-[10px] w-[16px] h-[16px] text-[#8892b0]" />
            <input 
              type="text" 
              placeholder="Buscar embarcação..." 
              className="w-full bg-[#112240] border border-[#233554] rounded text-[#ccd6f6] pl-[36px] pr-[12px] py-[8px] text-[14px] focus:outline-none focus:border-[#64ffda]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-[8px] space-y-[4px]">
          {mockEmbarcacoes.map(vessel => (
            <button
              key={vessel.id}
              onClick={() => setSelectedId(vessel.id)}
              className={`w-full flex items-center justify-between p-[12px] rounded text-left transition-colors
                ${selectedId === vessel.id 
                  ? 'bg-[#112240] border border-[#64ffda]/30' 
                  : 'hover:bg-[#112240]/50 border border-transparent'
                }
              `}
            >
              <div className="flex items-center gap-[12px]">
                <div className={`w-[8px] h-[8px] rounded-full ${vessel.status === 'critical' ? 'bg-red-500' : vessel.status === 'warning' ? 'bg-yellow-500' : 'bg-[#64ffda]'}`} />
                <div>
                  <span className={`block font-bold text-[14px] ${selectedId === vessel.id ? 'text-[#64ffda]' : 'text-[#ccd6f6]'}`}>
                    {vessel.nome}
                  </span>
                  <span className="text-[12px] text-[#8892b0]">{vessel.tipo}</span>
                </div>
              </div>
              <Anchor className={`w-[16px] h-[16px] ${selectedId === vessel.id ? 'text-[#64ffda]' : 'text-[#233554]'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Área de Detalhes */}
      <div className="flex-1 bg-[#0a192f]/50 border border-[#233554] rounded-lg p-[24px]">
        <div className="flex justify-between items-start mb-[24px]">
          <div>
            <h2 className="text-[24px] font-bold text-[#ccd6f6] flex items-center gap-[12px]">
              <Anchor className="text-[#64ffda]" />
              {mockEmbarcacoes.find(v => v.id === selectedId)?.nome}
            </h2>
            <p className="text-[#8892b0] mt-[4px]">Gerencie os certificados desta embarcação.</p>
          </div>
          <button className="bg-[#112240] text-[#64ffda] border border-[#64ffda] px-[16px] py-[8px] rounded font-bold text-[13px] hover:bg-[#64ffda]/10">
            + Novo Certificado
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {mockCertificados.map(cert => (
            <div key={cert.id} className="bg-[#112240] border border-[#233554] p-[16px] rounded hover:border-[#64ffda]/30 transition-colors group relative">
              <div className="flex justify-between items-start mb-[12px]">
                <div className="p-[8px] bg-[#0a192f] rounded text-[#64ffda]">
                  <FileText className="w-[20px] h-[20px]" />
                </div>
                {cert.status === DocStatus.VALIDADO ? (
                  <CheckCircle className="text-[#64ffda] w-[16px] h-[16px]" />
                ) : cert.status === DocStatus.EXPIRADO ? (
                  <AlertCircle className="text-red-500 w-[16px] h-[16px]" />
                ) : (
                  <AlertCircle className="text-yellow-500 w-[16px] h-[16px]" />
                )}
              </div>
              
              <h3 className="text-[#ccd6f6] font-bold text-[14px] mb-[4px]">{cert.tipo}</h3>
              <p className="text-[#8892b0] text-[12px] mb-[12px]">
                Validade: {cert.dataValidade ? new Date(cert.dataValidade).toLocaleDateString() : 'N/A'}
              </p>
              
              <div className="w-full bg-[#233554] h-[4px] rounded-full overflow-hidden">
                <div 
                  className={`h-full ${cert.status === DocStatus.VALIDADO ? 'bg-[#64ffda]' : cert.status === DocStatus.EXPIRADO ? 'bg-red-500' : 'bg-yellow-500'}`} 
                  style={{ width: cert.status === DocStatus.VALIDADO ? '100%' : '100%' }}
                />
              </div>

              <button className="absolute top-[16px] right-[16px] opacity-0 group-hover:opacity-100 text-[#64ffda] text-[12px] font-bold bg-[#112240] px-2">
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceSectionEmbarcacoes;
