import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { setInfoCheckout } from 'src/app/store/actions/checkout.action';
import { KeyValue } from '@angular/common';
import { KeyValuePair } from 'src/models/KeyValuePair.model';
import { InfoPrice } from 'src/models/InfoPrice.model';
import { InfoPriceLabelInputs } from 'src/app/shared/info-price-label/info-price-label.component';
import { Observable } from 'rxjs';
import { AppUser } from 'src/models/User.model';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';

@Component({
  selector: 'app-review-and-pay',
  templateUrl: './review-and-pay.component.html',
  styleUrls: ['./review-and-pay.component.scss'],
})
export class ReviewAndPayComponent implements OnInit {
  public user$: Observable<AppUser>;
  public checkout$: Observable<CheckoutState>;

  public projectInfo: InfoPriceLabelInputs;
  public customerInfo: InfoPriceLabelInputs;
  public packageInfo: InfoPriceLabelInputs;
  public addOnInfo: InfoPriceLabelInputs;
  public totalInfo: InfoPriceLabelInputs;

  constructor(private readonly $store: Store<AppState>) {
    this.projectInfo = new InfoPriceLabelInputs({
      label: 'Project: ',
    });
    this.customerInfo = new InfoPriceLabelInputs({
      label: 'Name: ',
    });
    this.packageInfo = new InfoPriceLabelInputs({
      label: 'Package: ',
    });
    this.addOnInfo = new InfoPriceLabelInputs({
      label: 'Add ons: ',
    });
    this.totalInfo = new InfoPriceLabelInputs({
      label: 'Total: ',
    });

    this.$store.dispatch(setInfoCheckout({ info: '', description: [] }));
    this.user$ = this.$store.select((state) => state.user?.user);
    this.checkout$ = this.$store.select((state) => state.checkout);
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      const firstName = user.first_name;
      const firstNameLength = user.first_name.length;
      const firstNameLabel =
        firstName[firstNameLength - 1] === ' '
          ? firstName.slice(0, firstNameLength - 1)
          : firstName;

      this.projectInfo.infoPriceList = [
        new InfoPrice({ info: `${firstNameLabel}'s apartment renovation` }),
      ];
      this.customerInfo.infoPriceList = [
        new InfoPrice({ info: `${user.first_name} ${user.last_name}` }),
      ];
    });

    this.checkout$.subscribe((checkoutState) => {
      this.packageInfo.infoPriceList = [
        new InfoPrice({
          info: checkoutState.packageBox.name,
          price: checkoutState.packageBox.price,
        }),
      ];

      this.addOnInfo.infoPriceList = checkoutState.addOnList
        .filter((addOn) => addOn.isSelected)
        .map((addOn) => {
          return new InfoPrice({ info: addOn.name, price: addOn.price });
        });

      const total = [
        ...this.addOnInfo.infoPriceList.map((infoPrice) => infoPrice.price),
        ...this.packageInfo.infoPriceList.map((infoPrice) => infoPrice.price),
      ].reduce((prev, curent) => {
        return prev + curent;
      });

      this.totalInfo.infoPriceList = [new InfoPrice({ price: total })];
    });
  }
}
