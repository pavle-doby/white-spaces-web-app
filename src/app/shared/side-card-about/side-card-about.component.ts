import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {
  BREAKING_POINT_PX,
  MEDIA_QUERY_WIDTH,
} from 'src/app/app.config';
import { getClientWidthPX } from '../Utilities';

@Component({
  selector: 'app-side-card-about',
  templateUrl: './side-card-about.component.html',
  styleUrls: ['./side-card-about.component.scss'],
})
export class SideCardAboutComponent implements OnInit {
  public isHandsetMode: boolean;
  public matecher: MediaQueryList;

  constructor(private readonly mediaMatcher: MediaMatcher) {}

  ngOnInit(): void {
    //solution 1
    this.isHandsetMode = BREAKING_POINT_PX > getClientWidthPX();

    // //solution 2
    // this.matecher = this.mediaMatcher.matchMedia(MEDIA_QUERY_WIDTH);
    // this.isHandsetMode = this.matecher.matches;

    // //solution 3
    // this.matecher.addEventListener('change', (medaiEvent) => {
    //   this.isHandsetMode = medaiEvent.matches;
    // });
  }
}
