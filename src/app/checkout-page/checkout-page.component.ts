import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from '../store/reducers/checkout.reducer';

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
    private readonly window: Window
  ) {
    this.$checkoutState = this.$store.select((state) => state.checkout);
    this.window.document.body.style.width = `100vw`;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
