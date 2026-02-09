import React from 'react';
import { FileText, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import { ComplianceDocumento, DocStatus, DocTipo } from '../../../types';

// Mock Data para teste visual
const mockDocs: ComplianceDocumento[] = [
  {
    id: 1,
    tipo: DocTipo.CONTRATO_SOCIAL,
    status: DocStatus.VALIDADO,
    dataValidade: '2030-01-01',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    id: 2,
    tipo: DocTipo.CARTAO_CNPJ,
    status: DocStatus.PENDENTE,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    id: 3,
    tipo: DocTipo.CERTIDAO_NEGATIVA,
    status: DocStatus.EXPIRADO,
    dataValidade: '2023-12-31',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  }
];

const StatusBadge: React.FC<{ status: DocStatus }> = ({ status }) => {
  switch (status) {
    case DocStatus.VALIDADO:
      return (
        <span className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-full bg-[#64ffda]/10 text-[#64ffda] text-[12px] font-bold border border-[#64ffda]/20">
          <CheckCircle className="w-[12px] h-[12px]" /> VALIDADO
        </span>
      );
    case DocStatus.PENDENTE:
      return (
        <span className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-full bg-yellow-500/10 text-yellow-500 text-[12px] font-bold border border-yellow-500/20">
          <Clock className="w-[12px] h-[12px]" /> PENDENTE
        </span>
      );
    case DocStatus.EXPIRADO:
      return (
        <span className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-full bg-red-500/10 text-red-500 text-[12px] font-bold border border-red-500/20">
          <AlertCircle className="w-[12px] h-[12px]" /> EXPIRADO
        </span>
      );
    case DocStatus.INVALIDO:
      return (
        <span className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-full bg-red-500/10 text-red-500 text-[12px] font-bold border border-red-500/20">
          <XCircle className="w-[12px] h-[12px]" /> INVÁLIDO
        </span>
      );
    default:
      return null;
  }
};

const ComplianceSectionEmpresa: React.FC = () => {
  return (
    <div className="space-y-[24px]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[#ccd6f6] text-[20px] font-bold mb-[4px]">Documentação da Empresa</h2>
          <p className="text-[#8892b0] text-[14px]">Mantenha os documentos regulatórios atualizados.</p>
        </div>
        <button className="bg-[#64ffda] text-[#0a192f] px-[16px] py-[8px] rounded font-bold text-[14px] hover:bg-[#64ffda]/90 transition-colors">
          + Adicionar Documento
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#233554]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#112240] text-[#8892b0] text-[12px] uppercase tracking-wider border-b border-[#233554]">
              <th className="p-[16px] font-medium">Tipo de Documento</th>
              <th className="p-[16px] font-medium">Status</th>
              <th className="p-[16px] font-medium">Validade</th>
              <th className="p-[16px] font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#233554] bg-[#0a192f]/30">
            {mockDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-[#112240]/30 transition-colors group">
                <td className="p-[16px] flex items-center gap-[12px] text-[#ccd6f6]">
                  <div className="p-[8px] rounded bg-[#112240] text-[#64ffda]">
                    <FileText className="w-[16px] h-[16px]" />
                  </div>
                  <span className="font-medium">{doc.tipo.replace(/_/g, ' ')}</span>
                </td>
                <td className="p-[16px]">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="p-[16px] text-[#8892b0] text-[14px]">
                  {doc.dataValidade ? new Date(doc.dataValidade).toLocaleDateString() : '-'}
                </td>
                <td className="p-[16px]">
                  <button className="text-[#64ffda] text-[13px] font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                    Gerenciar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceSectionEmpresa;
