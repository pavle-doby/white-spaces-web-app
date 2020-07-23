import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  public login(username: string, password: string) {
    this.isAuthenticated.next(true);
  }

  public logout(redirect: string) {
    this.isAuthenticated.next(false);
  }
}
