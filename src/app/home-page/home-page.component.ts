import { Component, OnInit, HostListener } from '@angular/core';
import { NavBtnsInitStateObj } from '../shared/navbar/navbar.content';

@Component({
  selector: 'app-home-page',
  providers: [{ provide: Window, useValue: window }],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private window: Window) {
    //this.window.document.body.style.width = `${100 * 5}vw`;
  }

  ngOnInit(): void {}

  public onClick(): void {
    console.log('Implement service or state to close side-card');
  }

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
