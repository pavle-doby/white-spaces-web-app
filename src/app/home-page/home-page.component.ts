import { Component, OnInit, HostListener } from '@angular/core';
import { NavBtnsInitStateObj } from '../shared/navbar/navbar.content';
import { Observable } from 'rxjs';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Component({
  selector: 'app-home-page',
  providers: [{ provide: Window, useValue: window }],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  matcher: MediaQueryList;
  isMobile: boolean = false;
  // isHandset$: Observable<boolean> = this.breakpointObserver
  //   .observe([Breakpoints.Handset, Breakpoints.HandsetPortrait])
  //   .pipe(
  //     tap((result) => console.log(result)),
  //     map((result) => result.matches),
  //     shareReplay()
  //   );

  constructor(
    private window: Window,
    private mediaMatcher: MediaMatcher,
    private readonly store: Store<AppState>
  ) {
    if (window.innerWidth >= 959) {
      this.window.document.body.style.width = '500vw';
      this.isMobile = false;
    } else {
      this.window.document.body.style.width = '100vw';
      this.isMobile = true;
    }
    this.matcher = this.mediaMatcher.matchMedia('(max-width: 959px)');
    this.matcher.addListener((event) => {
      console.log(event.matches);
      this.window.document.body.style.width = event.matches ? '100vw' : '500vw';
    });
    // this.isHandset$.subscribe((res) => {
    //   console.log(res);

    //   if (res) {
    //     this.window.document.body.style.width = '100vw';
    //   } else {
    //     this.window.document.body.style.width = '500vw';
    //   }
    // });
    //this.window.document.body.style.width = `${100 * 5}vw`;
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
