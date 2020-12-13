import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(private window: Window, private authService: AuthService) {
    this.window.document.body.style.width = '100vw';
    this.window.document.body.style.overflowY = 'scroll';
    this.authService.isAuthenticated.subscribe((isLoggedIn) => {
      const isAdmin = this.authService.isUserAdmin;
      this.isLoggedIn = isAdmin && isLoggedIn;
    });
  }

  ngOnInit(): void {}
}
