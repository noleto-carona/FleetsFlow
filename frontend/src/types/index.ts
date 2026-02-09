export enum DocStatus {
  PENDENTE = 'PENDENTE',
  VALIDADO = 'VALIDADO',
  INVALIDO = 'INVALIDO',
  EXPIRADO = 'EXPIRADO',
}

export enum DocTipo {
  CONTRATO_SOCIAL = 'CONTRATO_SOCIAL',
  CARTAO_CNPJ = 'CARTAO_CNPJ',
  ALVARA_FUNCIONAMENTO = 'ALVARA_FUNCIONAMENTO',
  CERTIDAO_NEGATIVA = 'CERTIDAO_NEGATIVA',
  BALANCO_PATRIMONIAL = 'BALANCO_PATRIMONIAL',
  OUTROS = 'OUTROS',
  // Embarcação
  TIE = 'TIE', // Título de Inscrição de Embarcação
  PROVISAO_REGISTRO = 'PROVISAO_REGISTRO',
  SEGURO_OBRIGATORIO = 'SEGURO_OBRIGATORIO',
  CSN = 'CSN', // Certificado de Segurança da Navegação
  // Tripulação
  CIR = 'CIR', // Caderneta de Inscrição e Registro
  CHA = 'CHA', // Carta de Habilitação de Amador (se aplicável)
  ASO = 'ASO', // Atestado de Saúde Ocupacional
  NR_30 = 'NR_30',
}

export interface ComplianceDocumento {
  id: number;
  tipo: DocTipo;
  status: DocStatus;
  dataValidade?: string; // ISO Date
  arquivoUrl?: string;
  observacao?: string;
  validadoEm?: string; // ISO Date
  createdAt: string;
  updatedAt: string;
}

export interface Tripulante {
  id: number;
  nome: string;
  cpf: string;
  funcao: string; // Comandante, Chefe de Máquinas, etc.
  documentos: ComplianceDocumento[];
}

export interface Embarcacao {
  id: number;
  nome: string;
  tipo: string; // Empurrador, Barcaça, etc.
  numeroInscricao?: string;
  certificados: ComplianceDocumento[]; // Mapeado de Perfil.complianceDocs ou relação direta futura
}

export interface Empresa {
  id: number;
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  documentos: ComplianceDocumento[];
  tripulantes: Tripulante[];
  embarcacoes: Embarcacao[]; // Adaptado do frontend para facilitar uso
}
