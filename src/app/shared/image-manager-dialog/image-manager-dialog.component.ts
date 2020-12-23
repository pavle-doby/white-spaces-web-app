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
        })
        .catch((err) => {
          console.error(err);
          alert(MSG_ACTION_UNSUCCSSFUL);
        });
    });
  }

  public async onDeleteEvent({ image, i }): Promise<void> {
    this.imgBuffer = this.imgBuffer.filter((img) => img.src !== image.src);
    this.imgBuffDeleted = [...this.imgBuffDeleted, image];
  }

  confirmActions(): void {
    this.imgBuffDeleted.forEach((img) => {
      this.checkoutService
        .deleteImage(img.src)
        .toPromise()
        .then()
        .catch((err) => {
          console.error(err);
          alert(MSG_ACTION_UNSUCCSSFUL);
        });
    });

    this.dialogRef.close(this.imgBuffer);
  }

  cancel(): void {
    this.imgBuffAdded.forEach((img) => {
      this.checkoutService
        .deleteImage(img.src)
        .toPromise()
        .then()
        .catch((err) => {
          console.error(err);
          alert(MSG_ACTION_UNSUCCSSFUL);
        });
    });
    this.dialogRef.close(null);
  }
}
