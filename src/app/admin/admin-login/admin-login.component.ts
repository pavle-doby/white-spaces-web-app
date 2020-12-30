import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserRole } from 'src/models/User.model';
import { setUser } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;

  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.authService.cleanLogin(username, password).subscribe((res) => {
          LocalStorageService.Instance.AuthToken = res.token ?? '';
          const { user_info } = res;
          const { role } = user_info;

          if (role !== UserRole.ADMIN) {
            this.loginInvalid = true;
          } else {
            this.store.dispatch(setUser({ user: user_info }));
            this.authService.isAuthenticated.next(true);
            this.router.navigate(['admin/orders']);
          }
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
