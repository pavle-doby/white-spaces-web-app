import { Component, OnInit } from '@angular/core';
import { FQAContentObj, FQALabels } from './FQA';
import { OpeningLabel } from '../opening-label/OpeningLabel';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-side-card-fqa',
  templateUrl: './side-card-fqa.component.html',
  styleUrls: ['./side-card-fqa.component.scss'],
})
export class SideCardFqaComponent implements OnInit {
  public navLabels: FQALabels[];
  public contentList: OpeningLabel[];
  public selectedNavLabel: FQALabels;

  public isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.navLabels = Object.keys(FQAContentObj) as FQALabels[];
    this.selectedNavLabel = this.navLabels[0];
    this.contentList = FQAContentObj[this.selectedNavLabel].slice();

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }

  ngOnInit(): void {}

  public selectContent(label: FQALabels): void {
    this.selectedNavLabel = label;
    this.contentList = FQAContentObj[label].slice();
  }

  public onStatusChange(toShowDesc: boolean, index: number): void {
    this.contentList = this.contentList.map((openingLabel, i) => {
      openingLabel.isOpen = false;
      return openingLabel;
    });
    this.contentList[index].isOpen = toShowDesc;
  }
}
