import React, { useState } from 'react';
import { FileText, CheckCircle, AlertCircle, Search, User } from 'lucide-react';
import { DocStatus, DocTipo } from '../../../types';

const mockTripulantes = [
  { id: 1, nome: 'João da Silva', funcao: 'Comandante', status: 'ok' },
  { id: 2, nome: 'Maria Oliveira', funcao: 'Chefe de Máquinas', status: 'pending' },
  { id: 3, nome: 'Carlos Souza', funcao: 'Marinheiro de Convés', status: 'ok' },
];

const mockDocsTripulante = [
  { id: 201, tipo: DocTipo.CIR, status: DocStatus.VALIDADO, dataValidade: '2027-01-15' },
  { id: 202, tipo: DocTipo.ASO, status: DocStatus.PENDENTE, dataValidade: '2024-05-20' },
  { id: 203, tipo: DocTipo.NR_30, status: DocStatus.VALIDADO, dataValidade: '2025-08-10' },
];

const ComplianceSectionTripulacao: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(mockTripulantes[0].id);

  return (
    <div className="flex gap-[24px] h-[600px]">
      <div className="w-[320px] bg-[#0a192f]/50 border border-[#233554] rounded-lg flex flex-col">
        <div className="p-[16px] border-b border-[#233554]">
          <div className="relative">
            <Search className="absolute left-[12px] top-[10px] w-[16px] h-[16px] text-[#8892b0]" />
            <input 
              type="text" 
              placeholder="Buscar membro da equipe..." 
              className="w-full bg-[#112240] border border-[#233554] rounded text-[#ccd6f6] pl-[36px] pr-[12px] py-[8px] text-[14px] focus:outline-none focus:border-[#64ffda]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-[8px] space-y-[4px]">
          {mockTripulantes.map(person => (
            <button
              key={person.id}
              onClick={() => setSelectedId(person.id)}
              className={`w-full flex items-center justify-between p-[12px] rounded text-left transition-colors
                ${selectedId === person.id 
                  ? 'bg-[#112240] border border-[#64ffda]/30' 
                  : 'hover:bg-[#112240]/50 border border-transparent'
                }
              `}
            >
              <div className="flex items-center gap-[12px]">
                <div className="w-[32px] h-[32px] rounded-full bg-[#233554] flex items-center justify-center text-[#64ffda]">
                  <User className="w-[16px] h-[16px]" />
                </div>
                <div>
                  <span className={`block font-bold text-[14px] ${selectedId === person.id ? 'text-[#64ffda]' : 'text-[#ccd6f6]'}`}>
                    {person.nome}
                  </span>
                  <span className="text-[12px] text-[#8892b0]">{person.funcao}</span>
                </div>
              </div>
              {person.status === 'pending' && (
                <div className="w-[8px] h-[8px] rounded-full bg-yellow-500" title="Pendências" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-[#0a192f]/50 border border-[#233554] rounded-lg p-[24px]">
        <div className="flex justify-between items-start mb-[24px]">
          <div className="flex items-center gap-[16px]">
            <div className="w-[48px] h-[48px] rounded-full bg-[#112240] border border-[#64ffda]/30 flex items-center justify-center">
              <User className="w-[24px] h-[24px] text-[#64ffda]" />
            </div>
            <div>
              <h2 className="text-[24px] font-bold text-[#ccd6f6]">
                {mockTripulantes.find(p => p.id === selectedId)?.nome}
              </h2>
              <p className="text-[#8892b0] text-[14px]">
                {mockTripulantes.find(p => p.id === selectedId)?.funcao} • CPF: ***.***.***-**
              </p>
            </div>
          </div>
          <button className="bg-[#112240] text-[#64ffda] border border-[#64ffda] px-[16px] py-[8px] rounded font-bold text-[13px] hover:bg-[#64ffda]/10">
            + Adicionar Documento
          </button>
        </div>

        <div className="space-y-[12px]">
          {mockDocsTripulante.map(doc => (
            <div key={doc.id} className="flex items-center justify-between bg-[#112240] border border-[#233554] p-[16px] rounded hover:border-[#64ffda]/30 transition-colors">
              <div className="flex items-center gap-[16px]">
                <div className="p-[10px] bg-[#0a192f] rounded text-[#8892b0]">
                  <FileText className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <h3 className="text-[#ccd6f6] font-medium">{doc.tipo}</h3>
                  <p className="text-[#8892b0] text-[12px]">
                    Validade: {doc.dataValidade ? new Date(doc.dataValidade).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-[24px]">
                {doc.status === DocStatus.VALIDADO ? (
                  <span className="flex items-center gap-[6px] text-[#64ffda] text-[12px] font-bold bg-[#64ffda]/10 px-[10px] py-[4px] rounded-full">
                    <CheckCircle className="w-[12px] h-[12px]" /> VALIDADO
                  </span>
                ) : (
                  <span className="flex items-center gap-[6px] text-yellow-500 text-[12px] font-bold bg-yellow-500/10 px-[10px] py-[4px] rounded-full">
                    <AlertCircle className="w-[12px] h-[12px]" /> PENDENTE
                  </span>
                )}
                <button className="text-[#8892b0] hover:text-[#64ffda] text-[13px] font-medium underline">
                  Ver arquivo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceSectionTripulacao;
