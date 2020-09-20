import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {
    console.log(this.router);
  }

  public get headerName() {
    let name = this.router.url.slice(7);
    return (
      name.charAt(0).toUpperCase() + name.slice(1) ||
      'White Spaces Redesign - Admin Panel'
    );
  }

  // public get isDashboard() {
  //   return this.router.url === '/admin';
  // }

  public logOut(): void {
    this.authService.logout();
  }
}
