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
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { FloorPlan } from 'src/models/FloorPlan.model';

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

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
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
    this.checkoutService
      .uploadFile(files[0])
      .toPromise()
      .then((linkObj) => {
        this.$store.dispatch(
          setFloorPlanCheckout({
            floorPlan: new FloorPlan({
              url: linkObj.url,
              name: files[0].name,
            }),
          })
        );
        this.fileName = files[0].name;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
