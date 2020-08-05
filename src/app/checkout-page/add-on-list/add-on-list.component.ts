import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setAddOnIsSelectedCheckout,
} from 'src/app/store/actions/checkout.action';
import { AddOn } from 'src/models/AddOn';

const INFO = `If you feel like you want more you can easily
customise you package & add extra plans and drawings.`;

const INFO_DESC = `Please note that adding extra plans will require additional
engagement and time for finishing project.`;

@Component({
  selector: 'app-add-on-list',
  templateUrl: './add-on-list.component.html',
  styleUrls: ['./add-on-list.component.scss'],
})
export class AddOnListComponent implements OnInit {
  public $chekoutState: Observable<CheckoutState>;

  constructor(private readonly $store: Store<AppState>) {
    this.$chekoutState = this.$store.select((state) => state.checkout);
    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC] })
    );
  }

  ngOnInit(): void {}

  public onAddRemoveAddOn(addOn: AddOn): void {
    this.$store.dispatch(
      setAddOnIsSelectedCheckout({ addOn: addOn, isSelected: addOn.isSelected })
    );
  }
}
