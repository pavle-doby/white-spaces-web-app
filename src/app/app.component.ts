import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [{ provide: Window, useValue: window }],

  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'white-spaces-web-app';

  constructor(private readonly window: Window) {}

  public onMouseWheel($event): void {
    if ($event.wheelDeltaX !== 0) return;

    this.window.scrollBy($event.wheelDelta, 0);
  }
}
