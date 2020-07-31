import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { checkoutSetInfo } from 'src/app/store/actions/checkout.action';

const INFO = `Please upload photos of your space.`;

const INFO_DESC_0 = `Take photos from as many different angles as possible.
  Take photos in different periods during the day so that we can feel the space and light changes.`;

const INFO_DESC_1 = `Make sure that file is in any of the following formats
  .jpeg .png`;

@Component({
  selector: 'app-space-photos',
  templateUrl: './space-photos.component.html',
  styleUrls: ['./space-photos.component.scss'],
})
export class SpacePhotosComponent implements OnInit {
  constructor(private readonly $store: Store<AppState>) {
    this.$store.dispatch(
      checkoutSetInfo({ info: INFO, description: [INFO_DESC_0, INFO_DESC_1] })
    );
  }

  ngOnInit(): void {}
}
