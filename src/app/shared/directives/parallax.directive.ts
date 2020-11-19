import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { SCROLL_SPEED } from 'src/app/app.config';

@Directive({
  selector: '[appParallax]',
})
export class ParallaxDirective {
  @Input('ratio') parallaxRatio: number = 12;
  currentLeft: number;
  previousScrollX: number;
  screenWidth: number = window.innerWidth;
  startLeft: number;
  ratio: number = 0;
  scroll: any;
  currentDelta: number = 0;

  constructor(private element: ElementRef) {
    if (this.screenWidth >= 959) {
      this.element.nativeElement.style.transitionDuration = '.33s';
      this.scroll = fromEvent<any>(window, 'wheel')
        .pipe(debounce(() => interval(50)))
        .subscribe((event) => {
          const x = event.deltaX || event.deltaY;
          const direction = x > 0 ? 1 : -1;
          const offset = SCROLL_SPEED * direction;
          if (
            window.scrollX > this.startLeft - this.screenWidth / 2 &&
            window.scrollX < this.startLeft
          ) {
            if (!this.currentDelta) {
              this.currentDelta = offset;
            } else if (
              (this.currentDelta > 0 && offset > 0) ||
              (this.currentDelta < 0 && offset < 0)
            ) {
              this.currentDelta += offset;
            } else {
              this.element.nativeElement.style.transform = `translateX(${0}px)`;
              this.currentDelta = offset;
            }
          }
          this.startLeft = this.element.nativeElement.offsetLeft;
          if (
            window.scrollX > this.startLeft - this.screenWidth / 2 &&
            window.scrollX < this.startLeft
          )
            this.element.nativeElement.style.transform = `translateX(${
              -this.currentDelta / this.parallaxRatio
            }px)`;
        });
    }
    return;
  }
}
