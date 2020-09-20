import { Component } from '@angular/core';
import { fromEvent, interval, Observable } from 'rxjs';
import { debounce, map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { closeNavbarCard } from './store/actions/navbar.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [{ provide: Window, useValue: window }],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public isAdmin: boolean = true;
  public title = 'white-spaces-web-app';
  public showCheckoutPage: boolean = true;
  public scroll;
  public footerActive: boolean = false;

  public get ShowCheckoutPage(): boolean {
    return this.router.url.includes(MainRouterPaths.CHECKOUT);
  }
  constructor(
    private readonly window: Window,
    private breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {
    this.router.events.subscribe((route) => {
      this.footerActive = route instanceof NavigationEnd || this.footerActive;
      this.isAdmin = this.router.url.includes('admin');
    });
    this.scroll = fromEvent<any>(window, 'wheel')
      .pipe(debounce(() => interval()))
      .subscribe((event) =>
        this.window.scrollBy({
          left: event.wheelDelta * 0.5,
          top: 0,
          //behavior: 'smooth',
        })
      );
  }

  public closeNavbarCard(): void {
    this.store.dispatch(closeNavbarCard());
  }
}
