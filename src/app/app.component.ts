import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [{ provide: Window, useValue: window }],

  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'white-spaces-web-app';
  public showCheckoutPage: boolean = true;

  constructor(
    private readonly window: Window,
    private readonly router: Router
  ) {
    console.log(this.router.url);
  }

  public get ShowCheckoutPage(): boolean {
    return this.router.url.includes(MainRouterPaths.CHECKOUT);
  }

  public onMouseWheel($event): void {
    if ($event.wheelDeltaX !== 0) return;

    this.window.scrollBy($event.wheelDelta, 0);
  }
}
