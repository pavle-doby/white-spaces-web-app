import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public toRegister: boolean = true;
  constructor(private readonly window: Window) {
    this.window.document.body.style.width = `100vw`;
  }

  ngOnInit(): void {}

  public showLoginTab(): void {
    this.toRegister = false;
  }

  public showRegisterTab(): void {
    this.toRegister = true;
  }
}
