import { Component, OnInit } from '@angular/core';
import { AppTitle } from 'src/app/shared/title/AppTitle';
import { OpeningLabel } from 'src/app/shared/opening-label/OpeningLabel';
import {
  YOU_GET_OPENING_LABELS,
  YOU_GET_LINEAR_GRADIENT,
} from './you-get.config';

@Component({
  selector: 'app-you-get',
  templateUrl: './you-get.component.html',
  styleUrls: ['./you-get.component.scss'],
})
export class YouGetComponent implements OnInit {
  public readonly youGetTitle: AppTitle;
  public readonly openingLabelsArray: OpeningLabel[];
  public gradient: string = YOU_GET_LINEAR_GRADIENT;

  constructor() {
    this.youGetTitle = new AppTitle('WHAT YOU GET');
    this.openingLabelsArray = YOU_GET_OPENING_LABELS;
  }

  ngOnInit(): void {}
}
