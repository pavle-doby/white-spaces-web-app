import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FOOTER_MAIN_MESSAGE } from './footer.config';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Output() public scrollEvent: EventEmitter<void>;

  public title: string = FOOTER_MAIN_MESSAGE;
  public showScrollOnRoutes = ['/', '/home', '/blog'];
  public showScrollMessage: boolean = this.showScroll(this.router.url);
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((val) => {
        this.showScrollMessage = this.showScroll(this.router.url);
      });

    this.scrollEvent = new EventEmitter();
  }

  showScroll(string: string): boolean {
    return this.showScrollOnRoutes.includes(string);
  }
  ngOnInit(): void {}

  scroll(): void {
    this.scrollEvent.emit();
  }
}
