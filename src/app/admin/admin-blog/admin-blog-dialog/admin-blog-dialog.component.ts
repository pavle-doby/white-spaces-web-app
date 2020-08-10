import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-admin-blog-dialog',
  templateUrl: './admin-blog-dialog.component.html',
  styleUrls: ['./admin-blog-dialog.component.scss'],
})
export class AdminBlogDialogComponent implements OnInit {
  public data: any;
  public editor = ClassicEditor;
  public editorData: string = '<p>Hello, world!</p>';
  public creatorMock: any = [
    { value: 0, viewValue: 'Natasa Nikolic' },
    { value: 1, viewValue: 'Admin 2' },
  ];
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
