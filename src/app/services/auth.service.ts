import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserVM, AppUser, UserRole } from 'src/models/User.model';
import { API_URL } from '../app.config';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { BEARER, LocalStorageService } from './local-storage.service';

//http://18.221.175.43//api/auth/login
//email: 'petar@psoftware.com',
//password: 'test',

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false); //set for true for testing purposes

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly store: Store<AppState>
  ) {}

  public get isUserLoggedIn(): boolean {
    const { AuthToken } = LocalStorageService.Instance;
    return !!AuthToken.replace(BEARER, '');
  }

  public get isUserAdmin(): boolean {
    const { User } = LocalStorageService.Instance;
    return User ? User.role === UserRole.ADMIN : false;
  }

  //TODO: Aks team about this call... Maybe now is useless.
  public isAuth(): Observable<any> {
    return this.http.get(`${API_URL}/api/auth/my_data`);
  }

  public cleanLogin(
    email: string,
    password: string
  ): Observable<{ user_info: AppUser; message: string; token: string }> {
    const params = {
      email: email,
      password: password,
    };
    const URL = `${API_URL}/api/auth/login`;
    return this.http.post<{
      user_info: AppUser;
      message: string;
      token: string;
    }>(URL, params);
  }

  public resetPassword(email: string): Observable<{ message: string }> {
    const URL = `${API_URL}/api/auth/reset-password`;
    return this.http.post<{ message: string }>(URL, { email });
  }

  public logout() {
    this.isAuthenticated.next(false);
    localStorage.setItem('isAdmin', 'false');
  }

  public registerUser(
    userVM: UserVM
  ): Observable<{ message: string; user_info: AppUser }> {
    return this.http.post<{ message: string; user_info: AppUser }>(
      `${API_URL}/api/auth/register`,
      { ...userVM }
    );
  }

  public getUserData(user_id: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${API_URL}/api/auth/user/${user_id}`);
  }
}
