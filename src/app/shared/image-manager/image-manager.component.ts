import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/models/Image.model';
import { ImageGridConfig } from '../image-grid/models/ImageGridConfig.model';
import { UploadConfig } from '../upload/upload.model';
import { ImageManagerConfig } from './models/ImageManagerConfig.model';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
})
export class ImageManagerComponent implements OnInit {
  @Input() uploadConfig: UploadConfig;
  @Input() gridConfig?: ImageGridConfig;
  @Input() config?: ImageManagerConfig;

  @Input() images?: Image[];

  @Output() uploadEvent: EventEmitter<FileList>;
  @Output() deleteEvent: EventEmitter<{ id: any; src: string }>;

  constructor() {
    this.config = new ImageManagerConfig({});
    this.gridConfig = new ImageGridConfig({});

    this.uploadEvent = new EventEmitter();
    this.deleteEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.gridConfig.limit = this.uploadConfig.limit;
  }

  onUploadEvent(files: FileList): void {
    this.uploadEvent.emit(files);
  }

  onDeleteEvent(image): void {
    this.deleteEvent.emit(image);
  }
}
