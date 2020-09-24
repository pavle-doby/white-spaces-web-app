import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BREAKING_POINT_PX } from 'src/app/app.config';
import { getClientWidthPX } from '../Utilities';

@Component({
  selector: 'app-side-card-contact',
  templateUrl: './side-card-contact.component.html',
  styleUrls: ['./side-card-contact.component.scss'],
})
export class SideCardContactComponent implements OnInit {
  public isHandset: boolean;
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.isHandset = BREAKING_POINT_PX > getClientWidthPX();
  }
}
