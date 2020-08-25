import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import * as customEdior from './editor';
import * as Editor from './ckeditor';

@Component({
  selector: 'app-admin-blog-dialog',
  templateUrl: './admin-blog-dialog.component.html',
  styleUrls: ['./admin-blog-dialog.component.scss'],
})
export class AdminBlogDialogComponent implements OnInit {
  public data: any;
  //public editor = ClassicEditor;
  public customEditor = Editor;
  public editorData: string = '<p>Hello, world!</p>';
  public config;
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

  ngOnInit() {
    this.config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'highlight',
          '|',
          'alignment',
          '|',
          'numberedList',
          'bulletedList',
          '|',
          'indent',
          'outdent',
          '|',
          'todoList',
          'link',
          'blockQuote',
          'imageUpload',
          'insertTable',
          '|',
          'undo',
          'redo',
        ],
      },
      language: 'en',
      image: {
        toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
      licenseKey: '',
      simpleUpload: {
        uploadUrl: 'http://18.221.175.43/api/file/upload',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    };
  }
  //{{HOST}}/api/file/upload
  public onReady($event) {
    console.log($event, 'lmao');
  }
  public save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
