import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  public editorData: string = '';
  public config;
  public creatorMock: any = [
    { value: 0, viewValue: 'Natasa Nikolic' },
    { value: 1, viewValue: 'Admin 2' },
  ];
  public selectedAdmin: string = '';
  public title: string = '';
  public isEdit: boolean;
  constructor(
    private dialogRef: MatDialogRef<AdminBlogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    if (this.data) {
      this.isEdit = true;
      this.title = this.data.topic;
      this.editorData = this.data.viewBlog;
      this.selectedAdmin = this.data.creator;
    } else this.isEdit = false;
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
      },
    };
  }
  public onOptionClick(value: string) {
    this.selectedAdmin = value;
  }
  //{{HOST}}/api/file/upload
  public onReady($event) {}
  public save() {
    this.dialogRef.close({
      html: this.editorData,
      creator: this.selectedAdmin,
      title: this.title,
      isEdit: this.isEdit,
    });
  }

  close() {
    this.dialogRef.close();
  }
}
