import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from '../store/reducers/checkout.reducer';
import { CheckoutService } from '../services/checkout.service.ts.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  public $checkoutState: Observable<CheckoutState>;

  constructor(
    private readonly router: Router,
    private readonly $store: Store<AppState>,
    private readonly window: Window,
    private readonly checkoutService: CheckoutService
  ) {
    this.$checkoutState = this.$store.select((state) => state.checkout);
    this.window.document.body.style.width = `100vw`;
    this.checkoutService
      .getShoppingCart()
      .toPromise()
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
