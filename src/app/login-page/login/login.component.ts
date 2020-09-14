import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { setUser } from 'src/app/store/actions/user.actions';

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
    private readonly authService: AuthService,
    private readonly store: Store<AppState>
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

    this.authService
      .cleanLogin(this.email, this.password)
      .toPromise()
      .then((res) => {
        this.store.dispatch(setUser({ user: res.user_info }));
        if (!res.user_info.verified) {
          alert('Verify your registration in email.');
          return;
        }

        this.router.navigateByUrl(`/${MainRouterPaths.CHECKOUT}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
