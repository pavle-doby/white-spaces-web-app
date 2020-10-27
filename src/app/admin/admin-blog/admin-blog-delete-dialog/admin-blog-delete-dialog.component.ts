import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-blog-delete-dialog',
  templateUrl: './admin-blog-delete-dialog.component.html',
  styleUrls: ['./admin-blog-delete-dialog.component.scss'],
})
export class AdminBlogDeleteDialogComponent {
  public id: number;
  constructor(
    public dialogRef: MatDialogRef<AdminBlogDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public save() {
    this.dialogRef.close({
      id: this.id,
    });
  }
}
