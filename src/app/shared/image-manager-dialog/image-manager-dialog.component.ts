import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMG_LOADING } from 'src/app/app.config';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImageManagerDialogData,
    private readonly dialogRef: MatDialogRef<ImageManagerDialogComponent>,
    private readonly checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.imgBuffer = clone<Image[]>(this.data.images);
  }

  public onUploadEvent(fileList: FileList): void {
    let updated = [];
    Object.values(fileList).forEach((file, i) => {
      updated = [...updated, this.imgBuffer.length];
      this.imgBuffer = [...this.imgBuffer, new Image({ src: IMG_LOADING })];
      this.checkoutService
        .uploadFile(file)
        .toPromise()
        .then((linkObj) => {
          this.imgBuffer[updated[i]] = new Image({ src: linkObj.link });
          this.imgBuffer = clone<Image[]>(this.imgBuffer);
        })
        .catch((err) => {
          console.error(err);
          alert('Something went wrong.');
        });
    });
  }

  public onDeleteEvent({ image, i }): void {
    console.log({ image, i });
  }

  addFiles(): void {
    console.log('Add Files');
    this.dialogRef.close(this.imgBuffer);
  }

  cancel(): void {
    console.log('Cancel');
    //delete files from s3
    this.dialogRef.close(null);
  }
}
