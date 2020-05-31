import { Component } from '@angular/core';
import { WINDOW_SCROLL_SPEED } from './config/constants/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [{ provide: Window, useValue: window }],

  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'white-spaces-web-app';

  constructor(private window: Window) {}

  onMouseWheel($event) {
    $event.wheelDelta > 0
      ? this.window.scrollBy(WINDOW_SCROLL_SPEED, 0)
      : this.window.scrollBy(-WINDOW_SCROLL_SPEED, 0);
  }
}
