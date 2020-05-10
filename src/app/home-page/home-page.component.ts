import {
  Component,
  OnInit,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {
  }

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
