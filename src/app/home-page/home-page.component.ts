import { Component, OnInit, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { MEDIA_QUERY_WIDTH, SCROLL_BEHAVIOR } from '../app.config';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  providers: [{ provide: Window, useValue: window }],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  matcher: MediaQueryList;
  isMobile: boolean = false;
  parallaxRatio: number = 1;
  
  public scrollLeftSub: Subject<void> = new Subject<void>();
  public scrollRightSub: Subject<void> = new Subject<void>();

  private throttleDuration: number = 500; // in ms
  private scrollOffset = 500; // in px

  public readonly homeId: string = 'home23';
  public readonly youGetId: string = 'you-get23';

  constructor(
    private window: Window,
    private mediaMatcher: MediaMatcher,
    private readonly store: Store<AppState>
  ) {
    if (window.innerWidth >= 959) {
      this.window.document.body.style.width = '450vw';
      this.isMobile = false;
    } else {
      this.window.document.body.style.width = '100vw';
      this.isMobile = true;
    }
    this.matcher = this.mediaMatcher.matchMedia(MEDIA_QUERY_WIDTH);
    this.matcher.addListener((event) => {
      this.window.document.body.style.width = event.matches ? '100vw' : '450vw';
    });
  }

  ngOnInit(): void {
    this.scrollRightSub
      .pipe(throttleTime(this.throttleDuration))
      .subscribe(() => {
        this.scrollRight();
      });

    this.scrollLeftSub
      .pipe(throttleTime(this.throttleDuration))
      .subscribe(() => {
        this.scrollLeft();
      });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'PageDown':
      case 'ArrowDown':
      case 'ArrowRight': {
        this.scrollRightSub.next();
        break;
      }
      case 'PageUp':
      case 'ArrowUp':
      case 'ArrowLeft': {
        this.scrollLeftSub.next();
        break;
      }
      case 'Home': {
        const home = document.getElementById(this.homeId);

        home.scrollIntoView({
          behavior: SCROLL_BEHAVIOR,
          inline: 'center',
          block: 'center',
        });
        break;
      }
      case 'End': {
        const youGet = document.getElementById(this.youGetId);

        youGet.scrollIntoView({
          behavior: SCROLL_BEHAVIOR,
          inline: 'center',
          block: 'center',
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  scrollRight(): void {
    window.scrollBy({
      left: this.scrollOffset,
      top: 0,
      behavior: SCROLL_BEHAVIOR,
    });
  }

  scrollLeft(): void {
    window.scrollBy({
      left: -this.scrollOffset,
      top: 0,
      behavior: SCROLL_BEHAVIOR,
    });
  }
}
