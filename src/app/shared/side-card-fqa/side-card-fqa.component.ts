import { Component, OnInit } from '@angular/core';
import { FQAContentObj, FQALabels } from './FQA';
import { OpeningLabel } from '../opening-label/OpeningLabel';

@Component({
  selector: 'app-side-card-fqa',
  templateUrl: './side-card-fqa.component.html',
  styleUrls: ['./side-card-fqa.component.scss'],
})
export class SideCardFqaComponent implements OnInit {
  public navLabels: FQALabels[];
  public contentList: OpeningLabel[];
  public selectedNavLabel: FQALabels;

  constructor() {
    this.navLabels = Object.keys(FQAContentObj) as FQALabels[];
    this.selectedNavLabel = this.navLabels[0];
    this.contentList = FQAContentObj[this.selectedNavLabel];
  }

  ngOnInit(): void {}

  public selectContent(label: FQALabels): void {
    this.selectedNavLabel = label;
    this.contentList = FQAContentObj[label];
  }
}
