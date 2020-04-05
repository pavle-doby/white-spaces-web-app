import { Component, OnInit, Input } from '@angular/core';

export interface INavPage {
  navLabel: string;
  toShowAll: boolean;
  backgroundColor: string;
  color: string;
}

@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss'],
})
export class NavPageComponent implements OnInit {
  @Input()
  public navLabel: string;
  @Input()
  public toShowAll: boolean;
  @Input()
  public backgroundColor: string;
  @Input()
  public color: string;

  constructor() {
    this.toShowAll = false;
  }

  public ngOnInit(): void {}
}
