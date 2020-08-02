import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setFloorPlanCheckout,
} from 'src/app/store/actions/checkout.action';
import { UploadData } from 'src/app/shared/upload/upload.model';
import { Observable } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';

const INFO = 'Welcome to your renovation project!';

@Component({
  selector: 'app-floor-paln-upload',
  templateUrl: './floor-paln-upload.component.html',
  styleUrls: ['./floor-paln-upload.component.scss'],
})
export class FloorPalnUploadComponent implements OnInit {
  public uploadData: UploadData;
  public successMsg: string;
  public fileName: string;

  public $chekcoutState: Observable<CheckoutState>;

  constructor(private readonly $store: Store<AppState>) {
    this.$store.dispatch(setInfoCheckout({ info: INFO, description: [] }));
    this.$chekcoutState = this.$store.select((state) => state.checkout);

    this.uploadData = new UploadData({
      limit: 1,
      message: 'Please upload your existing floor plan',
    });
    this.successMsg = 'You successfully uploaded your file!';
  }

  ngOnInit(): void {}

  public onUploadEvent(files: FileList): void {
    this.$store.dispatch(setFloorPlanCheckout({ file: files[0] }));
    this.fileName = files[0].name;
  }
}
