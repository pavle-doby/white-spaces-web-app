import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [{ provide: Window, useValue: window }],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isAdmin: boolean = true;
  public title = 'white-spaces-web-app';
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
