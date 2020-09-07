import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from 'src/models/User.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public toRegister: boolean = false;
  public isUserLoggedIn: boolean;

  public user$: Observable<AppUser>;
  public subUser: Subscription;

  constructor(
    private readonly window: Window,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly $store: Store<AppState>
  ) {
    this.window.document.body.style.width = `100vw`;
    this.user$ = this.$store.select((state) => state.user?.user);
  }

  ngOnInit(): void {
    this.subUser = this.user$.subscribe((user) => {
      this.isUserLoggedIn = !!user;
      if (this.isUserLoggedIn) {
        this.router.navigateByUrl(`/checkout(checkoutSteps:floor-plan)`);
      }
    });

    this.activeRoute.queryParams.subscribe((params) => {
      const { login } = params;
      this.toRegister = !+login;
    });
  }

  ngOnDestroy(): void {
    if (this.subUser) this.subUser.unsubscribe();
  }

  public showLoginTab(): void {
    this.toRegister = false;
  }

  public showRegisterTab(): void {
    this.toRegister = true;
  }
}
