import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  public isEmailValid: boolean = true;
  public isPasswordValid: boolean = true;

  public requiredErorrMessage: string = 'required.';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  public areInputsValid(): boolean {
    this.isEmailValid = !!this.email;
    this.isPasswordValid = !!this.password;

    return this.isEmailValid && this.isPasswordValid;
  }

  public logInUser(): void {
    if (!this.areInputsValid()) {
      return;
    }

    this.authService.login(this.email, this.password);
    this.authService.isAuthenticated.subscribe((heIs) => {
      if (heIs) {
        this.router.navigateByUrl(`/${MainRouterPaths.CHECKOUT}`);
      }
    });
  }
}
