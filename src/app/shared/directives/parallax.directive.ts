import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Directive({
  selector: '[appParallax]',
})
export class ParallaxDirective {
  @Input('ratio') parallaxRatio: number = 2;
  currentLeft: number;
  previousScrollX: number;
  screenWidth: number = window.innerWidth;
  startLeft: number;
  ratio: number = 0;
  scroll: any;
  accumulator:any=0;

  constructor(private element: ElementRef) {
    if (this.screenWidth >= 959) {
      this.element.nativeElement.style.transitionDuration = '.5s';
      this.scroll = fromEvent<any>(window, 'wheel')
        .subscribe((event) => {
          this.startLeft = this.element.nativeElement.offsetLeft;
          if (window.scrollX > this.startLeft - this.screenWidth/2){
            this.element.nativeElement.style.transform = `translateX(${event.wheelDelta*this.parallaxRatio}px)`;
          }
        });
    }
  }
}
