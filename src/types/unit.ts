export interface Unit {
  id: string;
  nome: string;
  tipo: string;
  endereco: string;
  bairro?: string;
  cidade: string;
  estado: string;
  telefone?: string;
  latitude?: number;
  longitude?: number;
}
