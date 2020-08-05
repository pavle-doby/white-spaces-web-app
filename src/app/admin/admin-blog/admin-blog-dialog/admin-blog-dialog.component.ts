import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-blog-dialog',
  templateUrl: './admin-blog-dialog.component.html',
  styleUrls: ['./admin-blog-dialog.component.scss'],
})
export class AdminBlogDialogComponent implements OnInit {
  public data: any;

  constructor(
    private dialogRef: MatDialogRef<AdminBlogDialogComponent>,
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
