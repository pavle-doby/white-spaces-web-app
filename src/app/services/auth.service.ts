import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserVM, AppUser, UserRole } from 'src/models/User.model';
import { API_URL } from '../app.config';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { setUser } from '../store/actions/user.actions';
import { LocalStorageService } from './local-storage.service';
//http://18.221.175.43//api/auth/login
//email: 'petar@psoftware.com',
//password: 'test',

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false); //set for true for testing purposes
  public isAdmin: boolean = localStorage.getItem('isAdmin') == 'true' || false;
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly store: Store<AppState>
  ) {
    this.isAuth().subscribe(
      (res) => {
        this.isAuthenticated.next(true);
      },
      (error) => this.isAuthenticated.next(false)
    );
  }

  public isAuth(): Observable<any> {
    return this.http.get(`${API_URL}/api/auth/my_data`, {
      withCredentials: true,
    });
  }

  public login(username: string, password: string) {
    this.http
      .post(
        `${API_URL}/api/auth/login`,
        {
          email: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .subscribe(
        (res) => {
          const userInfo = (res as any).user_info as AppUser;
          this.isAdmin = userInfo.role === 'admin';
          localStorage.setItem('isAdmin', new Boolean(this.isAdmin).toString());
          this.store.dispatch(setUser({ user: userInfo }));
          return this.isAuthenticated.next(true);
        },
        (error) => alert(error.error)
      );
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
    return this.http.post<{ user_info: AppUser; message: string; token: string }>(URL, params);
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
