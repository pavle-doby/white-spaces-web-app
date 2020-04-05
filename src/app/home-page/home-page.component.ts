import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { INavPage } from './nav-page/nav-page.component';

class ColorPair {
  constructor(public background, public color) {}
}

//TODO: Move to config file
const colors = {
  0: new ColorPair('rgb(229,229,227)', 'rgb(0,0,0)'),
  1: new ColorPair('rgb(29,30,32)', 'rgb(255,255,255)'),
  2: new ColorPair('rgb(34,35,66)', 'rgb(255,255,255)'),
  3: new ColorPair('rgb(99,18,51)', 'rgb(255,255,255)'),
  4: new ColorPair('rgb(175,61,50)', 'rgb(255,255,255)'),
  5: new ColorPair('rgb(220,128,77)', 'rgb(255,255,255)'),
  6: new ColorPair('rgb(254,241,145)', 'rgb(0,0,0)'),
};

class NavPage implements INavPage {
  constructor(
    public navLabel: string,
    public toShowAll: boolean,
    public backgroundColor: string,
    public color: string
  ) {}
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public navPageArray: INavPage[];
  public openPageIndex: number;

  constructor() {
    this.openPageIndex = 0;

    // TODO: Make const, maybe move to config file
    this.navPageArray = [
      new NavPage('Home', true, colors[0].background, colors[0].color),
      new NavPage('We Belive In', false, colors[1].background, colors[1].color),
      new NavPage('How We Do It', false, colors[2].background, colors[2].color),
      new NavPage(
        'How We It Works',
        false,
        colors[3].background,
        colors[3].color
      ),
      new NavPage(
        'What Do You Get',
        false,
        colors[4].background,
        colors[4].color
      ),
      new NavPage('Packages', false, colors[5].background, colors[5].color),
      new NavPage('Contact', false, colors[6].background, colors[6].color),
    ];
  }

  ngOnInit(): void {}

  // ili po indexima da se bira iz html-a
  public selectMe(navLabel: string): void {
    this.navPageArray = this.navPageArray.map((navPage, i) => {
      navPage.toShowAll = navPage.navLabel === navLabel;
      this.openPageIndex =
        navPage.navLabel === navLabel ? i : this.openPageIndex;
      return navPage;
    });
  }

  public selectNavPageByIndex(index: number): void {
    this.openPageIndex = index;
    this.navPageArray = this.navPageArray.map((navPage, i) => {
      navPage.toShowAll = i === index;
      return navPage;
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight': {
        if (this.openPageIndex === this.navPageArray.length - 1) {
          return;
        }

        this.openPageIndex += 1;
        this.selectNavPageByIndex(this.openPageIndex);
        break;
      }
      case 'ArrowLeft': {
        if (this.openPageIndex === 0) {
          return;
        }
        
        this.openPageIndex -= 1;
        this.selectNavPageByIndex(this.openPageIndex);
        break;
      }
      default: {
        break;
      }
    }
  }
}
