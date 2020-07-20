import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public goToSpacePhotos(): void {
    this.router.navigate([
      {
        outlets: {
          primary: 'checkout',
          checkout_ro: ['checkout', 'space-photos'],
        },
      },
    ]);
  }
}
