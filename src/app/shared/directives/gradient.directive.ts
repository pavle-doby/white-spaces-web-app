import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appGradient]',
  providers: [
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
  ],
})
export class GradientDirective {
  @Input() calculateByHeight: boolean = false;
  private documentWidth: number; //ceo width gradient 0 do 1
  private pageXOffset: number; //razdaljina trenutnog prozora od pocetka documentWidth. gradient 0+pageXOffset do 1.
  private currentPosition: number;
  private elementDim: number;
  // x je objekat linear gradient 0-1
  //boja elementa je onda pageXOffset - 30 : x =documentWidth:(linear gradient ceo)
  constructor(
    private element: ElementRef,
    private readonly window: Window,
    private readonly document: Document,
    private renderer: Renderer2
  ) {
    this.documentWidth =
      this.window.document.body.offsetWidth - this.window.innerWidth;
    this.calculateFirstHalfGradient();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.pageXOffset = this.window.pageXOffset;
    this.currentPosition = this.pageXOffset + this.window.innerWidth;
    this.calculateRelativeGradient();
  }

  private calculateRelativeGradient() {
    this.calculateFirstHalfGradient();
  }

  private calculateFirstHalfGradient() {
    this.elementDim = this.calculateByHeight
      ? this.element.nativeElement.offsetHeight
      : this.element.nativeElement.offsetWidth;
    const nula = 0;
    const full = this.documentWidth / 2;
    let newStartRGB = [];
    let newEndRGB = [];
    let gradientStartRGB = [242, 232, 220];
    let gradientEndRGB = [217, 183, 197];
    let gradientFinalRGB = [15, 13, 59];

    let diffArray2 = gradientStartRGB.map(
      (value, i) => value - gradientEndRGB[i]
    );
    let diffArray3 = gradientEndRGB.map(
      (value, i) => value - gradientFinalRGB[i]
    );
    let startPercentage =
      (((this.currentPosition - this.elementDim) * 100) /
        this.window.document.body.offsetWidth) *
      2;
    let endPercentage =
      ((this.currentPosition * 100) / this.window.document.body.offsetWidth) *
      2;

    if (this.currentPosition - 1920 < this.documentWidth / 2) {
      newStartRGB = diffArray2.map((element) =>
        Math.round((startPercentage * element) / 100)
      );
      newEndRGB = diffArray2.map(
        (element) => Math.round((endPercentage * element) / 100) + 1
      );
      this.renderer.setStyle(
        this.element.nativeElement,
        'background',
        `linear-gradient(to right,
      rgba(${242 - newStartRGB[0]}, ${232 - newStartRGB[1]}, ${
          220 - newStartRGB[2]
        }, 1) 0%,
     rgba(${242 - newEndRGB[0]}, ${232 - newEndRGB[1]}, ${
          220 - newEndRGB[2]
        }, 1) 100%
  )`
      );
    } else {
      newStartRGB = diffArray3.map((element) =>
        Math.round((startPercentage * element) / 200)
      );
      newEndRGB = diffArray3.map(
        (element) => Math.round((endPercentage * element) / 200) + 1
      );
      // console.log(newStartRGB);
      // console.log(newEndRGB);

      this.renderer.setStyle(
        this.element.nativeElement,
        'background',
        `linear-gradient(to right,
      rgba(${217 - newStartRGB[0]}, ${183 - newStartRGB[1]}, ${
          197 - newStartRGB[2]
        }, 1) 0%,
     rgba(${217 - newEndRGB[0]}, ${183 - newEndRGB[1]}, ${
          197 - newEndRGB[2]
        }, 1) 100%
  )`
      );
    }

    //console.log(newStartRGB, newEndRGB);
    // this.element.nativeElement.style.background = `linear-gradient(90deg,
    //      rgba(${242 - newStartRGB[0]}, ${232 - newStartRGB[1]}, ${
    //   220 - newStartRGB[2]
    // }, 1) 0%,
    //     rgba(${242 - newEndRGB[0]}, ${232 - newEndRGB[1]}, ${
    //   220 - newEndRGB[2]
    // }, 1) 100%,
    //  )`;

    //this.currentPos-30 : x = this.width/2 : 100
    //x = (this.currentPos-30*100)/this.width/2
    //242:217 = 232:183 = 220:197 = 100 : this.width/2 = x : this.currentPos-30
    // y = (this.currentPos*100)/this.width/2
    // z = y-x
    //242:0 = x : novaBojaR
    //232:0 = x : novaBojaG
    //220:0 = x : novaBojaB
    // 242-217 : 100 =
    //217:100 = novaBojaR : y
    //183:100 = novaBojaG : y
    //197:100 = novaBojaB : y

    // Konacna ideja:
    // Procentualna pozicija pocetka elementa: x = (this.currentPos-30*100)/this.width/2
    // onda za R,G,B vrednosti racunas novu boju na foru: Primer za R : y = (x*(242-217))/100;
    // Procentualna pozicija kraja elementa: x = (this.currentPos*100)/this.width/2
    // isti princip racunanja rgb
  }

  private calculateSecondHalfGradient() {}

  private calculateBothHalvesGradient() {}

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

// window.addEventListener('scroll', () => {
//   const y = 1 + (window.scrollY || window.pageYOffset) / 150
//   const [r, g, b] = [red/y, green/y, blue/y].map(Math.round)
//   section1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
// })
