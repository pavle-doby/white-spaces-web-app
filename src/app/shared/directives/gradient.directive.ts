import { Directive, ElementRef, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appGradient]',
  providers: [
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
  ],
})
export class GradientDirective {
  private documentWidth: number; //ceo width gradient 0 do 1
  private pageXOffset: number; //razdaljina trenutnog prozora od pocetka documentWidth. gradient 0+pageXOffset do 1.
  private currentPosition: number;
  // x je objekat linear gradient 0-1
  //boja elementa je onda pageXOffset - 30 : x =documentWidth:(linear gradient ceo)
  constructor(
    private element: ElementRef,
    private readonly window: Window,
    private readonly document: Document
  ) {
    console.log(this.element.nativeElement.offsetLeft);
    this.documentWidth =
      this.window.document.body.offsetWidth - this.window.innerWidth;
    this.element.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    console.log(this.element.nativeElement.offsetHeight); //za navbar iteme je height u pitanju. Razmotri width
    console.log(this.element);

    this.pageXOffset = this.window.pageXOffset;
    this.currentPosition = this.pageXOffset + this.window.innerWidth;
    console.log(this.pageXOffset);
    console.log(this.currentPosition);
  }

  // ngOnInit() {
  //   //console.log(this.element);
  // }
}

// background: linear-gradient(
//   90deg,
//   rgba(242, 232, 220, 1) 0%,
//   rgba(217, 183, 197, 1) 50%,
//   rgba(15, 13, 59, 1) 100%
// );
