import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'auth_user';

  async setToken(token: string): Promise<void> {
    await Preferences.set({ key: this.TOKEN_KEY, value: token });
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.TOKEN_KEY });
    return value || null;
  }

  async setRefreshToken(token: string): Promise<void> {
    await Preferences.set({ key: this.REFRESH_TOKEN_KEY, value: token });
  }

  async getRefreshToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.REFRESH_TOKEN_KEY });
    return value || null;
  }

  async setUser(user: any): Promise<void> {
    await Preferences.set({ key: this.USER_KEY, value: JSON.stringify(user) });
  }

  async getUser(): Promise<any> {
    const { value } = await Preferences.get({ key: this.USER_KEY });
    return value ? JSON.parse(value) : null;
  }

  async clearAuth(): Promise<void> {
    await Preferences.remove({ key: this.TOKEN_KEY });
    await Preferences.remove({ key: this.REFRESH_TOKEN_KEY });
    await Preferences.remove({ key: this.USER_KEY });
  }
}
