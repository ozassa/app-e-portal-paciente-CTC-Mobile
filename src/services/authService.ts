import api from './api';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import type { LoginRequest, LoginResponse, VerifyTwoFactorRequest, VerifyTwoFactorResponse } from '@/types/user';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async verifyTwoFactor(data: VerifyTwoFactorRequest): Promise<VerifyTwoFactorResponse> {
    const response = await api.post<VerifyTwoFactorResponse>('/auth/verify-2fa', data);

    await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
    await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    await storage.setObject(STORAGE_KEYS.USER_DATA, response.data.user);

    return response.data;
  },

  async logout(): Promise<void> {
    await storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    await storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    await storage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  async resendOTP(cpf: string, method: 'sms' | 'whatsapp'): Promise<void> {
    await api.post('/auth/resend-otp', { cpf, method });
  },
};
