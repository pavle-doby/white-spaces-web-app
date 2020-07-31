import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { checkoutSetInfo } from 'src/app/store/actions/checkout.action';

const INFO = 'Please upload your existing floor plan.';
const INFO_DESC_0 = `Make sure that file is in any of the following formats.`;
const INFO_DESC_1 = `.dwg . pdf .jpeg .png`;

@Component({
  selector: 'app-floor-paln-upload',
  templateUrl: './floor-paln-upload.component.html',
  styleUrls: ['./floor-paln-upload.component.scss'],
})
export class FloorPalnUploadComponent implements OnInit {
  constructor(private readonly $store: Store<AppState>) {
    this.$store.dispatch(
      checkoutSetInfo({ info: INFO, description: [INFO_DESC_0, INFO_DESC_1] })
    );
  }

  ngOnInit(): void {}
}
