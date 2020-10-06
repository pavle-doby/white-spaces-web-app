import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { MediaMatcher } from '@angular/cdk/layout';
import { MEDIA_QUERY_WIDTH } from 'src/app/app.config';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  providers: [
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
  ],
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  matcher: MediaQueryList;
  isMobile: boolean = false;
  viewPort: number;
  isFixed: boolean = false;
  @ViewChild('logo') logoRef: ElementRef;
  constructor(
    private readonly router: Router,
    private mediaMatcher: MediaMatcher
  ) {
    this.matcher = this.mediaMatcher.matchMedia(MEDIA_QUERY_WIDTH);
    this.matcher.addListener((event) => {
      this.isMobile = event.matches;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (!this.isMobile) {
      if (window.pageXOffset + window.innerWidth > window.innerWidth * 1.5)
        this.isFixed = true;
      else this.isFixed = false;
    }
    return;
  }

  ngOnInit(): void {}

  public goHome(): void {
    this.router.navigateByUrl(`/${MainRouterPaths.HOME}`);
  }
}
