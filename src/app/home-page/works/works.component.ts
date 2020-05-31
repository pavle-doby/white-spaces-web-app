import { Component, OnInit } from '@angular/core';
import { AppTitle } from 'src/app/shared/title/AppTitle';
import { TitleSize } from 'src/app/shared/title/TitleSize';
import { WORKS_LINEAR_GRADIENT } from './works.config';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  public worksTitleNormal: AppTitle;
  public worksTitleBold: AppTitle;
  public gradient: string = WORKS_LINEAR_GRADIENT;

  constructor() {
    this.worksTitleNormal = new AppTitle('HOW IT', null, TitleSize.NORMAL);
    this.worksTitleBold = new AppTitle('WORKS', null, TitleSize.NORMAL_BOLD);
  }

  ngOnInit(): void {}
}
