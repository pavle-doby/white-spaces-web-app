import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public toRegister: boolean = false;

  constructor(
    private readonly window: Window,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.window.document.body.style.width = `100vw`;
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      const { login } = params;
      this.toRegister = !+login;
    });
  }

  public showLoginTab(): void {
    this.toRegister = false;
  }

  public showRegisterTab(): void {
    this.toRegister = true;
  }
}
