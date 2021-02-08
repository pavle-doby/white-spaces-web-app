import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public isWSTeamBusy: boolean;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly adminService: AdminService
  ) {
    if (this.router.url === '/admin') this.router.navigate(['admin/orders']);
  }

  async ngOnInit(): Promise<void> {
    this.isWSTeamBusy = await this.adminService
      .getBusyFlag()
      .toPromise()
      .then((busFlagObj) => busFlagObj.flag)
      .catch((err) => {
        console.error(err);
        alert('Something went wrong with getting the busy flag.');
        return false;
      });
  }

  public get headerName() {
    let name = this.router.url.slice(7);
    return (
      name.charAt(0).toUpperCase() + name.slice(1) ||
      'White Spaces Redesign - Admin Panel'
    );
  }

  public logOut(): void {
    this.authService.logout();
  }

  public async updateBusyFlag(): Promise<void> {
    this.isWSTeamBusy = await this.adminService
      .updateBusyFlag(!this.isWSTeamBusy)
      .toPromise()
      .then((busFlagObj) => busFlagObj.flag)
      .catch((err) => {
        console.error(err);
        alert('Something went wrong with updating the busy flag.');
        return false;
      });
  }
}
