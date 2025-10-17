export interface Appointment {
  id: string;
  tipo: string;
  especialidade: string;
  profissional?: string;
  unidade: string;
  dataHora: string;
  status: string;
  observacoes?: string;
}
