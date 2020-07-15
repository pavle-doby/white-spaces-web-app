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

@Component({
  selector: 'app-you-get',
  templateUrl: './you-get.component.html',
  styleUrls: ['./you-get.component.scss'],
})
export class YouGetComponent implements OnInit, OnDestroy {
  public readonly youGetTitle: AppTitle;
  public readonly openingLabelsArray: OpeningLabel[];
  public gradient: string = YOU_GET_LINEAR_GRADIENT;

  private $subDialog: Subscription;

  constructor(private readonly MatDialog: MatDialog) {
    this.youGetTitle = new AppTitle('WHAT YOU GET');
    this.openingLabelsArray = YOU_GET_OPENING_LABELS;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.$subDialog) this.$subDialog.unsubscribe();
  }

  public openDialog(): void {
    const dialogRef = this.MatDialog.open(YouGetDialogComponent);

    this.$subDialog = dialogRef.afterClosed().subscribe((res) => {
      if (!res) return;

      this.downloadPackage();
    });
  }

  public downloadPackage(): void {
    console.log('downloadPackage');
  }
}
