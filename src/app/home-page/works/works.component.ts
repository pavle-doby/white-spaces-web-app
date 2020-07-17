import { Component, OnInit } from '@angular/core';
import { AppTitle } from 'src/app/shared/title/AppTitle';
import { TitleSize } from 'src/app/shared/title/TitleSize';
import {
  WORKS_IMAGE_DESCRIPTION,
  WORKS_LINEAR_GRADIENT,
  IImageDescription,
} from './works.config';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  public worksTitleNormal: AppTitle;
  public worksTitleBold: AppTitle;
  public gradient: string = WORKS_LINEAR_GRADIENT;
  public imageDescriptionArray: IImageDescription[] = WORKS_IMAGE_DESCRIPTION;

  constructor() {
    this.worksTitleNormal = new AppTitle('HOW IT', null, TitleSize.NORMAL);
    this.worksTitleBold = new AppTitle('WORKS', null, TitleSize.BIG_BOLD);
  }

  ngOnInit(): void {}
}
