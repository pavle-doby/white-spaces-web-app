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
export class YouGetComponent implements OnInit, OnDestroy {
  public readonly youGetTitle: AppTitle;
  public openingLabelsArray: OpeningLabel[];

  private $subDialog: Subscription;

  constructor(private readonly MatDialog: MatDialog) {
    this.youGetTitle = new AppTitle(
      'WHAT YOU GET',
      YOU_GET_LINEAR_GRADIENT,
      TitleSize.BIG_BOLD
    );
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

  public onOLStateChange(toShowDesc: boolean, index: number): void {
    for (let i = 0; i < this.openingLabelsArray.length; i++) {
      this.openingLabelsArray[i].isOpen = false;
    }
    this.openingLabelsArray[index].isOpen = toShowDesc;
  }

  public downloadPackage(): void {
    console.log('downloadPackage');
  }
}
