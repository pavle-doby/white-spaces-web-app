import { Component, OnInit, HostListener } from '@angular/core';
import { NavBtnsInitStateObj } from '../shared/navbar/navbar.content';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  providers: [{ provide: Window, useValue: window }],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private window: Window,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$.subscribe((res) => {
      if (res) {
        this.window.document.body.style.width = '100vw';
        this.window.document.body.style.height = '500vh';
      } else {
        this.window.document.body.style.width = '500vw';
      }
    });
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
