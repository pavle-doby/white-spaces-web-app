import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { setInfoCheckout } from 'src/app/store/actions/checkout.action';

@Component({
  selector: 'app-review-and-pay',
  templateUrl: './review-and-pay.component.html',
  styleUrls: ['./review-and-pay.component.scss'],
})
export class ReviewAndPayComponent implements OnInit {
  constructor(private readonly $store: Store<AppState>) {
    this.$store.dispatch(setInfoCheckout({ info: '', description: [] }));
  }

  ngOnInit(): void {}
}
