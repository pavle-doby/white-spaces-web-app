import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { setInfoCheckout } from 'src/app/store/actions/checkout.action';
import { InfoPrice } from 'src/models/InfoPrice.model';
import { InfoPriceLabelInputs } from 'src/app/shared/info-price-label/info-price-label.component';
import { Observable, Subject } from 'rxjs';
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

  public fullName: string;
  public address: string;
  public email: string;
  public iAgreeToTerms: boolean = false;

  public isFullNameValid$: Subject<string>;
  public isAddressValid$: Subject<string>;
  public isEmailValid$: Subject<string>;

  public isFullNameValid: boolean = true;
  public isAddressValid: boolean = true;
  public isEmailValid: boolean = true;

  public requiredErorrMessage: string = 'required';

  constructor(private readonly $store: Store<AppState>) {
    this.isFullNameValid$ = new Subject();
    this.isAddressValid$ = new Subject();
    this.isEmailValid$ = new Subject();

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
    this.isFullNameValid$.subscribe((fullName) => {
      this.isFullNameValid = !!fullName;
    });
    this.isAddressValid$.subscribe((address) => {
      this.isAddressValid = !!address;
    });
    this.isEmailValid$.subscribe((email) => {
      this.isEmailValid = !!email;
    });

    this.user$.subscribe((user) => {
      const firstName = user.first_name;
      const firstNameLength = user.first_name.length;
      const firstNameLabel =
        firstName[firstNameLength - 1] === ' '
          ? firstName.slice(0, firstNameLength - 1)
          : firstName;

      this.fullName = `${user.first_name} ${user.last_name}`;
      this.email = user.email;
      this.address = user.address;

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
