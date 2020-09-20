import { Component } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
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
  public isAdmin: boolean = true;
  public title = 'white-spaces-web-app';
  public showCheckoutPage: boolean = true;
  public scroll;

  public get ShowCheckoutPage(): boolean {
    return this.router.url.includes(MainRouterPaths.CHECKOUT);
  }
  constructor(
    private readonly window: Window,
    private readonly router: Router,
    private readonly store: Store<AppState>
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

  public closeNavbarCard(): void {
    this.store.dispatch(closeNavbarCard());
  }
}
