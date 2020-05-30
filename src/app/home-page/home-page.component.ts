import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-page',
  providers: [{ provide: Window, useValue: window }],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private window: Window) {}

  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight': {
        console.log('ArrowRight');

        break;
      }
      case 'ArrowLeft': {
        console.log('ArrowLeft');

        break;
      }
      default: {
        break;
      }
    }
  }
}
