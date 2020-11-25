import { Component, OnInit } from '@angular/core';
import { OpeningLabel } from 'src/app/shared/opening-label/OpeningLabel';
import { BELIVE_IN_OPENING_LABELS, LINER_GRADIENT } from './belive-in.config';
import { TitleSize } from 'src/app/shared/title/TitleSize';

@Component({
  selector: 'app-believe-in',
  templateUrl: './believe-in.component.html',
  styleUrls: ['./believe-in.component.scss'],
})
export class BelieveInComponent implements OnInit {
  public openingLabelsArray: OpeningLabel[];

  public readonly titleSize: TitleSize;
  public readonly titleGradient: string;

  constructor() {
    this.openingLabelsArray = BELIVE_IN_OPENING_LABELS;
    this.titleSize = TitleSize.BIG_BOLD;
    this.titleGradient = LINER_GRADIENT;
  }

  ngOnInit(): void {}

  public onStatusChange(toShowDesc: boolean, index: number): void {
    for (let i = 0; i < this.openingLabelsArray.length; i++) {
      this.openingLabelsArray[i].isOpen = false;
    }
    this.openingLabelsArray[index].isOpen = toShowDesc;
  }
}
