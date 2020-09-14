import { Component } from '@angular/core';
import { fromEvent, interval, Observable } from 'rxjs';
import { debounce, map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  public get ShowCheckoutPage(): boolean {
    return this.router.url.includes(MainRouterPaths.CHECKOUT);
  }
  constructor(
    private readonly window: Window,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.router.events.subscribe((route) => {
      this.isAdmin = this.router.url.includes('admin');
    });
    this.scroll = fromEvent<any>(window, 'wheel')
      .pipe(debounce(() => interval(100)))
      .subscribe((event) =>
        this.window.scrollBy({
          left: event.wheelDelta * 5,
          top: 0,
          behavior: 'smooth',
        })
      );
  }
}
