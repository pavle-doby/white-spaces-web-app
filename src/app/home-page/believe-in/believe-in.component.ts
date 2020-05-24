import { Component, OnInit } from '@angular/core';
import { OpeningLabel } from 'src/app/shared/opening-label/OpeningLabel';
import { OPENING_LABELS, LINER_GRADIENT } from './belive-in.config';
import { TitleTypes } from 'src/app/shared/title/TitleTypes';

@Component({
  selector: 'app-believe-in',
  templateUrl: './believe-in.component.html',
  styleUrls: ['./believe-in.component.scss'],
})
export class BelieveInComponent implements OnInit {
  public readonly openingLabelsArray: OpeningLabel[];
  public readonly titleSize: TitleTypes;
  public readonly titleGradient: string;

  constructor() {
    this.openingLabelsArray = OPENING_LABELS;
    this.titleSize = TitleTypes.BIG_BOLD;
    this.titleGradient = LINER_GRADIENT;
  }

  ngOnInit(): void {}
}
