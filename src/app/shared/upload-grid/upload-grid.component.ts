import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadData } from '../upload/upload.model';

const MSG = `Please upload your existing floor plan.`;
const LIMIT = 16;

@Component({
  selector: 'app-upload-grid',
  templateUrl: './upload-grid.component.html',
  styleUrls: ['./upload-grid.component.scss'],
})
export class UploadGridComponent implements OnInit {
  @Input()
  public uploadData: UploadData;
  @Output()
  public uploadFilesEvent: EventEmitter<FileList>;

  public imagePath: any;
  public imgURLs: (string | ArrayBuffer)[] = [];

  constructor() {
    this.uploadFilesEvent = new EventEmitter();
    //Dobar argument zasto ovakve dodele treba da idu u constructor
    this.uploadData = new UploadData({
      limit: LIMIT,
    });
  }

  ngOnInit(): void {}

  public onUploadEvent(files: FileList): void {
    this.imgURLs = [];
    //TODO: Catch this event and send files to BE
    this.uploadFilesEvent.emit(files);
    Object.keys(files).forEach((key) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[key]);
      reader.onload = () => {
        this.imgURLs.push(reader.result);
      };
    });
  }
}
