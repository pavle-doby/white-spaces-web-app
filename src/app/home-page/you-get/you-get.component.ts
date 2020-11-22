import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppTitle } from 'src/app/shared/title/AppTitle';
import { OpeningLabel } from 'src/app/shared/opening-label/OpeningLabel';
import {
  YOU_GET_OPENING_LABELS,
  YOU_GET_LINEAR_GRADIENT,
} from './you-get.config';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { YouGetDialogComponent } from './you-get-dialog/you-get-dialog.component';
import { TitleSize } from 'src/app/shared/title/TitleSize';

@Component({
  selector: 'app-you-get',
  templateUrl: './you-get.component.html',
  styleUrls: ['./you-get.component.scss'],
})
export class YouGetComponent implements OnInit {
  public readonly youGetTitle: AppTitle;
  public openingLabelsArray: OpeningLabel[];

  constructor(private readonly MatDialog: MatDialog) {
    this.youGetTitle = new AppTitle(
      'WHAT YOU GET',
      YOU_GET_LINEAR_GRADIENT,
      TitleSize.BIG_BOLD
    );
    this.openingLabelsArray = YOU_GET_OPENING_LABELS;
  }

  ngOnInit(): void {}

  public openDialog(): void {
    this.MatDialog.open(YouGetDialogComponent);
  }
}
