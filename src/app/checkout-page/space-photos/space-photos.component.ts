import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setSpacePhotosURLsCheckout,
  addSpacePhotoURLCheckout,
  clearSpacePhotosURLsCheckout,
} from 'src/app/store/actions/checkout.action';
import { UploadData } from 'src/app/shared/upload/upload.model';
import { Observable } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { LocalStorageKey } from 'src/app/services/local-storage.service';

const INFO = `Please upload photos of your space.`;

const INFO_DESC_0 = `Take photos from as many different angles as possible.
  Take photos in different periods during the day so that we can feel the space and light changes.`;

export const SUPPERTED_FILES = '.jpg, .jpeg, .png ';

@Component({
  selector: 'app-space-photos',
  templateUrl: './space-photos.component.html',
  styleUrls: ['./space-photos.component.scss'],
})
export class SpacePhotosComponent implements OnInit {
  public $checkoutState: Observable<CheckoutState>;
  public uploadConfigData: UploadData;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly chekcoutService: CheckoutService
  ) {
    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC_0] })
    );
    this.$checkoutState = this.$store.select((state) => state.checkout);

    this.uploadConfigData = new UploadData({
      supportedFileTypes: SUPPERTED_FILES,
      limit: 16,
    });
  }

  ngOnInit(): void {}

  public onUploadFilesEvent(files: FileList): void {
    if (files.length > 16) {
      console.log('Kazi user-u ne moze! :D ');
      return;
    }

    this.$store.dispatch(clearSpacePhotosURLsCheckout({}));

    Object.values(files).forEach((file) => {
      this.chekcoutService.uploadFile(file).subscribe((file) => {
        this.$store.dispatch(addSpacePhotoURLCheckout({ fileURL: file.link }));
      });
    });
  }
}
