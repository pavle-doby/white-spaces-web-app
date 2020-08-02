import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { checkoutSetInfo } from 'src/app/store/actions/checkout.action';

const INFO = 'Please upload your existing floor plan.';

@Component({
  selector: 'app-floor-paln-upload',
  templateUrl: './floor-paln-upload.component.html',
  styleUrls: ['./floor-paln-upload.component.scss'],
})
export class FloorPalnUploadComponent implements OnInit {
  constructor(private readonly $store: Store<AppState>) {
    this.$store.dispatch(checkoutSetInfo({ info: INFO, description: [] }));
  }

  ngOnInit(): void {}
}
