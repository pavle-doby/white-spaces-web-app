import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum ConfirmationDialogType {
  INFO = 'Info',
}

export class ConfirmationDialogData {
  public titleLabel: string;
  public message: string;
  public type?: ConfirmationDialogType;

  constructor(obj: ConfirmationDialogData) {
    this.titleLabel = obj.titleLabel;
    this.message = obj.message;
    this.type = obj.type;
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  public isTypeInfo: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
    this.isTypeInfo = data.type === ConfirmationDialogType.INFO;
  }

  ngOnInit(): void {}
}
