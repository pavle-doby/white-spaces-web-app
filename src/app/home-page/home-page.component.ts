import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Component({
  selector: 'app-home-page',
  providers: [{ provide: Window, useValue: window }],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private window: Window, private readonly store: Store<AppState>) {
    this.window.document.body.style.width = `${100 * 5}vw`;
  }

  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight': {
        console.log('ArrowRight - dodaj skrol');

        break;
      }
      case 'ArrowLeft': {
        console.log('ArrowLeft - dodaj skrol');

        break;
      }
      default: {
        break;
      }
    }
  }
}
