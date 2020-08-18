import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//http://18.221.175.43//api/auth/login
//email: 'petar@psoftware.com',
//password: 'test',

export const API_URL = 'http://18.221.175.43';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(true); //set for true for testing purposes
  constructor(private router: Router, private http: HttpClient) {
    this.isAuth().subscribe(
      (res) => {
        this.isAuthenticated.next(true);
      },
      (error) => this.isAuthenticated.next(true)
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
          return this.isAuthenticated.next(true);
        },
        (error) => alert(error.error)
      );
  }

  public logout() {
    this.isAuthenticated.next(false);
  }
}
