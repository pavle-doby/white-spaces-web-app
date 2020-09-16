import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class ConfirmationDialogData {
  public titleLabel: string;
  public message: string;
  constructor(obj: ConfirmationDialogData) {
    this.titleLabel = obj.titleLabel;
    this.message = obj.message;
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {}

  ngOnInit(): void {}
}
