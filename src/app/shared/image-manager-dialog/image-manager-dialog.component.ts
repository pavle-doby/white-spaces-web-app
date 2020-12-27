import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMG_LOADING, MSG_ACTION_UNSUCCSSFUL } from 'src/app/app.config';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { Image } from 'src/models/Image.model';
import { ImageManagerDialogData } from '../../../models/ImageManagerDialogData.model';
import { clone, count } from '../Utilities';

@Component({
  selector: 'app-image-manager-dialog',
  templateUrl: './image-manager-dialog.component.html',
  styleUrls: ['./image-manager-dialog.component.scss'],
})
export class ImageManagerDialogComponent implements OnInit {
  public imgBuffer: Image[];

  public imgBuffDeleted: Image[] = [];
  public imgBuffAdded: Image[] = [];

  public isInProgress: boolean = false;
  public isErrorOccurred: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImageManagerDialogData,
    private readonly dialogRef: MatDialogRef<ImageManagerDialogComponent>,
    private readonly checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.imgBuffer = clone<Image[]>(this.data.images);
  }

  public onUploadEvent(fileList: FileList): void {
    const limit = this.data.uploadConfig.limit;
    if (count(fileList) + this.imgBuffer.length > limit) {
      alert(`Max number of files is ${limit}`);
      return;
    }

    this.isInProgress = true;
    let updated = [];
    Object.values(fileList).forEach((file, i) => {
      updated = [...updated, this.imgBuffer.length];
      this.imgBuffer = [...this.imgBuffer, new Image({ src: IMG_LOADING })];
      this.checkoutService
        .uploadFile(file)
        .toPromise()
        .then((linkObj) => {
          const newImg = new Image({ src: linkObj.link });
          this.imgBuffer[updated[i]] = newImg;
          this.imgBuffer = clone<Image[]>(this.imgBuffer);
          this.imgBuffAdded = [...this.imgBuffAdded, newImg];
          this.isInProgress = !!this.imgBuffer.find(
            (img) => img.src === IMG_LOADING
          );
        })
        .catch((err) => {
          console.error(err);
          this.isInProgress = false;
          this.isErrorOccurred = true;
          alert(MSG_ACTION_UNSUCCSSFUL);
        });
    });
  }

  public async onDeleteEvent({ image, i }): Promise<void> {
    this.imgBuffer = this.imgBuffer.filter((img) => img.src !== image.src);
    this.imgBuffDeleted = [...this.imgBuffDeleted, image];
  }

  confirmActions(): void {
    this.isInProgress = true;
    if (!this.imgBuffDeleted.length) {
      this.dialogRef.close(this.imgBuffer);
    }
    this.imgBuffDeleted.forEach((img, i) => {
      this.checkoutService
        .deleteImage(img.src)
        .toPromise()
        .then(() => {
          if (i === this.imgBuffDeleted.length - 1) {
            this.isInProgress = false;
            this.dialogRef.close(this.imgBuffer);
          }
        })
        .catch((err) => {
          console.error(err);
          alert(MSG_ACTION_UNSUCCSSFUL);
          this.isInProgress = false;
          this.isErrorOccurred = true;
          this.dialogRef.close(this.imgBuffer);
        });
    });
  }

  cancel(): void {
    this.isInProgress = true;
    this.imgBuffAdded.forEach((img, i) => {
      this.checkoutService
        .deleteImage(img.src)
        .toPromise()
        .then(() => {
          if (i === this.imgBuffAdded.length - 1) {
            this.isInProgress = false;
            this.dialogRef.close(null);
          }
        })
        .catch((err) => {
          console.error(err);
          alert(MSG_ACTION_UNSUCCSSFUL);
          this.isInProgress = false;
          this.isErrorOccurred = true;
          this.dialogRef.close(null);
        });
    });
  }
}
