export interface User {
  id: string;
  cpf: string;
  nome: string;
  email: string;
  telefone?: string;
  celular?: string;
  dataNascimento?: string;
  sexo?: string;
  avatarUrl?: string;
  isActive: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  cpf: string;
  password: string;
}

export interface LoginResponse {
  requiresTwoFactor: boolean;
  message: string;
}

export interface VerifyTwoFactorRequest {
  cpf: string;
  code: string;
}

export interface VerifyTwoFactorResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
