import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { setInfoCheckout } from 'src/app/store/actions/checkout.action';
import { InfoPrice } from 'src/models/InfoPrice.model';
import { InfoPriceLabelInputs } from 'src/app/shared/info-price-label/info-price-label.component';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppUser } from 'src/models/User.model';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
  ConfirmationDialogType,
} from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { ProgressState, Step } from 'src/models/CheckoutProgress.model';

const DIALOG_WIDTH = '500px';

@Component({
  selector: 'app-review-and-pay',
  templateUrl: './review-and-pay.component.html',
  styleUrls: ['./review-and-pay.component.scss'],
})
export class ReviewAndPayComponent implements OnInit, OnDestroy {
  public user$: Observable<AppUser>;
  public subUser: Subscription;

  public checkout$: Observable<CheckoutState>;
  public subChekout: Subscription;

  public isAllDone: boolean;
  public shoppingCart: ShoppingCart;

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

  public subIsFullNameValid: Subscription;
  public subIsAddressValid: Subscription;
  public subIsEmailValid: Subscription;

  public isFullNameValid: boolean = true;
  public isAddressValid: boolean = true;
  public isEmailValid: boolean = true;

  public requiredErorrMessage: string = 'required';

  private dialogSub: Subscription;

  constructor(
    private readonly $store: Store<AppState>,
    public readonly dialog: MatDialog,
    public readonly checkoutService: CheckoutService
  ) {
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
    this.subIsFullNameValid = this.isFullNameValid$.subscribe((fullName) => {
      this.isFullNameValid = !!fullName;
    });
    this.subIsAddressValid = this.isAddressValid$.subscribe((address) => {
      this.isAddressValid = !!address;
    });
    this.subIsEmailValid = this.isEmailValid$.subscribe((email) => {
      this.isEmailValid = !!email;
    });

    this.subUser = this.user$.subscribe((user) => {
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

    this.subChekout = this.checkout$.subscribe((checkoutState) => {
      this.shoppingCart = checkoutState.shoppingCart;

      this.packageInfo.infoPriceList = [
        new InfoPrice({
          info: checkoutState.packageBox.name,
          price: checkoutState.packageBox.price,
        }),
      ];

      const steps: Step[] = Object.values(checkoutState.progressState);
      const uncomplitedSteps = steps.filter((step) =>
        step.isRequired ? step.state !== ProgressState.DONE : false
      );
      this.isAllDone = !uncomplitedSteps.length;

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

  ngOnDestroy(): void {
    if (this.dialogSub) this.dialogSub.unsubscribe();

    this.subChekout.unsubscribe();
    this.subUser.unsubscribe();
    this.subIsAddressValid.unsubscribe();
    this.subIsEmailValid.unsubscribe();
    this.subIsFullNameValid.unsubscribe();
  }

  public createOrder(): void {
    if (this.isAllDone) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: DIALOG_WIDTH,
        disableClose: true,
        data: new ConfirmationDialogData({
          titleLabel: 'Confrimation dialog',
          message: 'Are you sure you want to make this order?',
        }),
      });

      this.dialogSub = dialogRef.afterClosed().subscribe((res) => {
        if (!res) {
          return;
        }

        this.checkoutService
          .createOrder(this.shoppingCart.id)
          .toPromise()
          .then((res) => {
            alert('Congratulations! U made your order successfully! :D');
          })
          .catch((err) => {
            console.error(err);
            alert(err.message);
          });
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: DIALOG_WIDTH,
        disableClose: true,
        data: new ConfirmationDialogData({
          titleLabel: 'Information dialog',
          message: `You haven't completed all steps. Make sure you answered all questions.`,
          type: ConfirmationDialogType.INFO,
        }),
      });
    }
  }
}
