import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(true); //set for true for testing purposes
  constructor(private router: Router) {}

  public login(username: string, password: string) {
    this.isAuthenticated.next(true);
  }

  public logout() {
    this.isAuthenticated.next(false);
  }
}
