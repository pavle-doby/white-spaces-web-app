import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-order-dialog',
  templateUrl: './admin-order-dialog.component.html',
  styleUrls: ['./admin-order-dialog.component.scss'],
})
export class AdminOrderDialogComponent implements OnInit {
  public data: any;
  public statusArray: any = [
    { value: 0, viewValue: 'Not Accepted' },
    { value: 1, viewValue: 'In Progress' },
    { value: 2, viewValue: 'Finished' },
  ];

  public onProjectMock: any = [
    { value: 0, viewValue: 'Natasa Nikolic' },
    { value: 1, viewValue: 'Admin 2' },
  ];
  constructor(
    private dialogRef: MatDialogRef<AdminOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    console.log(data);
  }

  ngOnInit(): void {}

  public save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
