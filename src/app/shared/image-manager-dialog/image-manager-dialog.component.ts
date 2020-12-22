import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image } from 'src/models/Image.model';
import { ImageManagerDialogData } from '../../../models/ImageManagerDialogData.model';
import { clone } from '../Utilities';

@Component({
  selector: 'app-image-manager-dialog',
  templateUrl: './image-manager-dialog.component.html',
  styleUrls: ['./image-manager-dialog.component.scss'],
})
export class ImageManagerDialogComponent implements OnInit {
  public imgBuffer: Image[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageManagerDialogData) {}

  ngOnInit(): void {
    this.imgBuffer = clone<Image[]>(this.data.images);
  }

  public onUploadEvent(files: FileList): void {
    this.showFilesFromDevice(files);
  }

  public onDeleteEvent(image: Image): void {
    console.log('Po indexu');

    this.imgBuffer = this.imgBuffer.filter((img) => img.src !== image.src);
  }

  public showFilesFromDevice(files: FileList): void {
    const fileVals = Object.values(files);
    if (
      this.data.uploadConfig.limit <
      fileVals.length + this.imgBuffer.length
    ) {
      alert('Too many images are selected.');
      return;
    }

    Object.keys(files).forEach((key) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[key]);
      reader.onload = () => {
        this.imgBuffer = [
          ...this.imgBuffer,
          new Image({ src: reader.result as string }),
        ];
      };
    });
  }
}
