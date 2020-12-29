import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/models/Image.model';
import { ImageGridConfig } from '../image-grid/models/ImageGridConfig.model';
import { UploadConfig } from '../upload/upload.model';
import { getExtension } from '../Utilities';
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
  @Output() deleteEvent: EventEmitter<{ image: Image; i: number }>;

  public readonly dragNDropId: string = 'image-manager__drag-n-drop23';

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

  onDeleteEvent({ image, i }): void {
    this.deleteEvent.emit({ image, i });
  }

  dropHandler(ev): void {
    ev.preventDefault();
    console.log('dropHandler', { ev });

    let files = {};
    if (ev.dataTransfer.items) {
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          let file = ev.dataTransfer.items[i].getAsFile();
          files = this.addFileInFileList(file, files);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        let file = ev.dataTransfer.files[i];
        files = this.addFileInFileList(file, files, i);
      }
    }

    const isFilesEmpty = !Object.values(files).length;
    if (isFilesEmpty) {
      return;
    }

    this.uploadEvent.emit(files as FileList);
  }

  private addFileInFileList(
    file: File,
    fileList: Object = {},
    i?: number
  ): Object {
    i = i ?? Math.random() * this.uploadConfig.limit;
    i = Math.round(i);

    let extension = getExtension(file.name);

    if (this.uploadConfig.supportedFileTypes.includes(extension)) {
      fileList[`${i}${file.name}`] = file;
    } else {
      alert(`${extension} is not supported file type.`);
    }

    return fileList;
  }

  dragOverHandler(event): void {
    event.stopPropagation();
    event.preventDefault();
    // console.log('dragOverHandler', { event });
  }
}
