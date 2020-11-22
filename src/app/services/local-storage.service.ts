import { Injectable } from '@angular/core';
import { AppUser } from 'src/models/User.model';

export const BEARER = ' Bearer ';

export enum LocalStorageKey {
  PACKAGE_CATEGORY_ID = 'PACKAGE_CATEGORY_ID',
  ADDON_CATEGORY_ID = 'ADDON_CATEGORY_ID',
  USER = 'user',
  AUTH_TOKEN = 'auth-token',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private static _instance: LocalStorageService;

  public storage: Storage = localStorage;

  private constructor() {}

  public static get Instance(): LocalStorageService {
    return this._instance ?? (this._instance = new LocalStorageService());
  }

  public get User(): AppUser {
    return JSON.parse(this.storage.getItem(LocalStorageKey.USER));
  }

  public set User(user: AppUser) {
    this.storage.setItem(LocalStorageKey.USER, JSON.stringify(user));
  }

  public set AuthToken(token: string) {
    this.storage.setItem(LocalStorageKey.AUTH_TOKEN, `${BEARER}${token}`);
  }

  public get AuthToken() {
    return this.storage.getItem(LocalStorageKey.AUTH_TOKEN) ?? '';
  }

  public clearAuthToken(): void {
    this.storage.removeItem(LocalStorageKey.AUTH_TOKEN);
  }

  public get PackageCategroyId(): number {
    return JSON.parse(
      this.storage.getItem(LocalStorageKey.PACKAGE_CATEGORY_ID)
    );
  }

  public set PackageCategroyId(category_id: number) {
    this.storage.setItem(
      LocalStorageKey.PACKAGE_CATEGORY_ID,
      JSON.stringify(category_id)
    );
  }

  public get AddOnCategroyId(): number {
    return JSON.parse(this.storage.getItem(LocalStorageKey.ADDON_CATEGORY_ID));
  }

  public set AddOnCategroyId(category_id: number) {
    this.storage.setItem(
      LocalStorageKey.ADDON_CATEGORY_ID,
      JSON.stringify(category_id)
    );
  }
}
