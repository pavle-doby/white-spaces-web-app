import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

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
          if (window.scrollX > this.startLeft - this.screenWidth / 2) {
            if (!this.currentDelta) {
              this.currentDelta = event.wheelDelta;
            } else if (
              (this.currentDelta > 0 && event.wheelDelta > 0) ||
              (this.currentDelta < 0 && event.wheelDelta < 0)
            ) {
              this.currentDelta += event.wheelDelta;
            } else {
              this.element.nativeElement.style.transform = `translateX(${0}px)`;
              this.currentDelta = event.wheelDelta;
            }
          }
          this.startLeft = this.element.nativeElement.offsetLeft;
          if (window.scrollX > this.startLeft - this.screenWidth / 2)
            this.element.nativeElement.style.transform = `translateX(${
              -this.currentDelta / this.parallaxRatio
            }px)`;
        });
    }
    return;
  }
}
