import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import { CheckoutState } from '../store/reducers/checkout.reducer';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  public $checkoutState: Observable<CheckoutState>;
  public checkoutState: CheckoutState;

  constructor(
    private readonly router: Router,
    private readonly $store: Store<AppState>
  ) {
    this.$checkoutState = this.$store.select((state) => state.checkout);
  }

  ngOnInit(): void {
    this.$checkoutState.subscribe((checkoutState) => {
      if (!checkoutState) {
        return;
      }
      this.checkoutState = checkoutState;
    });
  }
}
