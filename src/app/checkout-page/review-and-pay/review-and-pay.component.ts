import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import {
  selectTabbarButtonCheckout,
  setInfoCheckout,
  setInitStateChekcout,
} from 'src/app/store/actions/checkout.action';
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
import { CONFIRMATION_DIALOG_WIDTH } from 'src/app/app.config';
import { TabbarText } from 'src/models/TabbarText.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { CheckoutPaths } from '../checkout-paths';
import { firstToUpperCase } from 'src/app/shared/Utilities';
import { PrivacyPolicyDialogComponent } from 'src/app/shared/privacy-policy-dialog/privacy-policy-dialog.component';
import { TermsAndConditionsComponent } from 'src/app/shared/terms-and-conditions/terms-and-conditions.component';

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
  public iAgreeToDesign: boolean = false;

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
  private dialogInvoiceSub: Subscription;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly dialog: MatDialog,
    private readonly checkoutService: CheckoutService,
    private readonly router: Router
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
    this.$store.dispatch(
      selectTabbarButtonCheckout({ btnText: TabbarText.REVIEW_PAY })
    );
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
      const lastName = firstToUpperCase(user.last_name);
      const firstName = firstToUpperCase(user.first_name);
      const firstNameLength = user.first_name.length;
      const firstNameLabel =
        firstName[firstNameLength - 1] === ' '
          ? firstName.slice(0, firstNameLength - 1)
          : firstName;

      this.fullName = `${firstName} ${lastName}`;
      this.email = user.email;
      this.address = user.address;

      this.projectInfo.infoPriceList = [
        new InfoPrice({ info: `${firstNameLabel}'s apartment renovation` }),
      ];
      this.customerInfo.infoPriceList = [
        new InfoPrice({ info: `${firstName} ${lastName}` }),
      ];
    });

    this.subChekout = this.checkout$.subscribe((checkoutState) => {
      this.shoppingCart = checkoutState.shoppingCart;

      this.packageInfo.infoPriceList = [
        new InfoPrice({
          info: firstToUpperCase(checkoutState.packageBox.name),
          price: checkoutState.packageBox.price,
        }),
      ];

      const steps: Step[] = Object.values(checkoutState.progressState);
      console.log({ steps });

      const uncomplitedSteps = steps.filter((step) =>
        step.isRequired ? step.state !== ProgressState.DONE : false
      );
      console.log({ uncomplitedSteps });

      this.isAllDone = !uncomplitedSteps.length;
      console.log('isAllDone', this.isAllDone);

      this.addOnInfo.infoPriceList = checkoutState.addOnList
        .filter((addOn) => addOn.isSelected)
        .map((addOn) => {
          return new InfoPrice({ info: addOn.name, price: addOn.price });
        });

      const total = [
        ...this.addOnInfo.infoPriceList.map((infoPrice) => infoPrice.price),
        ...this.packageInfo.infoPriceList.map((infoPrice) => infoPrice.price),
      ].reduce((prev, current) => {
        return prev + current;
      });

      this.totalInfo.infoPriceList = [new InfoPrice({ price: total })];
    });
  }

  ngOnDestroy(): void {
    if (this.dialogSub) this.dialogSub.unsubscribe();
    if (this.dialogInvoiceSub) this.dialogInvoiceSub.unsubscribe();

    this.subChekout.unsubscribe();
    this.subUser.unsubscribe();
    this.subIsAddressValid.unsubscribe();
    this.subIsEmailValid.unsubscribe();
    this.subIsFullNameValid.unsubscribe();
  }

  public openPrivacyPolicy(): void {
    this.dialog.open(PrivacyPolicyDialogComponent);
  }

  public openTermsAndConditions(): void {
    this.dialog.open(TermsAndConditionsComponent);
  }

  public createOrder(): void {
    if (this.isAllDone) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: CONFIRMATION_DIALOG_WIDTH,
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
            LocalStorageService.Instance.storage.clear();
            this.$store.dispatch(setInitStateChekcout({}));
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              width: CONFIRMATION_DIALOG_WIDTH,
              disableClose: true,
              data: new ConfirmationDialogData({
                titleLabel: 'Information dialog',
                message: `The document with the invoice is on your way!
                Please check your email!`,
                type: ConfirmationDialogType.INFO,
              }),
            });

            this.dialogInvoiceSub = dialogRef.afterClosed().subscribe(() => {
              this.router.navigateByUrl(`/${MainRouterPaths.THANK_YOU}`);
            });
          })
          .catch((err) => {
            console.error(err);
            alert(err.message);
          });
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: CONFIRMATION_DIALOG_WIDTH,
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
