import { Component, OnInit } from '@angular/core';
import { AppTitle } from 'src/app/shared/title/AppTitle';
import {
  DO_IT_PARAGRAPH_1,
  DO_IT_PARAGRAPH_2,
  DO_IT_PARAGRAPH_3,
  DO_IT_LINEAR_GRADIENT,
} from './do-it.config';
import { TitleSize } from 'src/app/shared/title/TitleSize';

const DO_IT_TITLE = 'HOW WE DO IT';

@Component({
  selector: 'app-do-it',
  templateUrl: './do-it.component.html',
  styleUrls: ['./do-it.component.scss'],
})
export class DoItComponent implements OnInit {
  public doItTitle: AppTitle;
  public gradient: string = DO_IT_LINEAR_GRADIENT;
  public paragraphs: { text: string; isBold: boolean }[];

  constructor() {
    this.doItTitle = new AppTitle(DO_IT_TITLE, null, TitleSize.BIG_BOLD);
    this.paragraphs = [
      { text: DO_IT_PARAGRAPH_1, isBold: false },
      { text: DO_IT_PARAGRAPH_2, isBold: true },
      { text: DO_IT_PARAGRAPH_3, isBold: false },
    ];
  }

  ngOnInit(): void {}
}
