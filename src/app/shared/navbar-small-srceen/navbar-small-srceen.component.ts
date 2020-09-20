import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

@Component({
  selector: 'app-navbar-small-srceen',
  templateUrl: './navbar-small-srceen.component.html',
  styleUrls: ['./navbar-small-srceen.component.scss'],
})
export class NavbarSmallSrceenComponent {
  public homeLink: string = MainRouterPaths.HOME;
  public packagesLink: string = MainRouterPaths.PACKAGES;
  public fqasLink: string = MainRouterPaths.FQAS;
  public blogLink: string = MainRouterPaths.BLOG;
  public aboutLink: string = MainRouterPaths.ABOUT;
  public contactLink: string = MainRouterPaths.CONTACT;

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
