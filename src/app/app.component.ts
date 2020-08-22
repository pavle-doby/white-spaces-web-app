import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

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

  public get ShowCheckoutPage(): boolean {
    return this.router.url.includes(MainRouterPaths.CHECKOUT);
  }
  constructor(private readonly window: Window, private router: Router) {
    this.router.events.subscribe((route) => {
      this.isAdmin = this.router.url.includes('admin');
    });
  }

  public onMouseWheel($event): void {
    if ($event.wheelDeltaX !== 0) return;
    this.window.scrollBy($event.wheelDelta, 0);
  }
}
