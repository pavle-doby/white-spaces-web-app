import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setAddOnIsSelectedCheckout,
  setAddOnListCheckout,
} from 'src/app/store/actions/checkout.action';
import { AddOn } from 'src/models/AddOn';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { convertQuestionsDTOListToQuestionsList } from 'src/app/shared/Utilities';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
  public addOnList: AddOn[] = [];

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
    this.$chekoutState = this.$store.select((state) => state.checkout);
    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC] })
    );
  }

  ngOnInit(): void {
    this.addOnList = LocalStorageService.Instance.AddOnList;

    if (!this.addOnList?.length) {
      this.checkoutService
        .getAllAddOns()
        .toPromise()
        .then((addOnList) => {
          this.addOnList = addOnList.map((addOnDTO) => {
            const questions = convertQuestionsDTOListToQuestionsList(
              addOnDTO.additional_data.questions
            );
            return new AddOn({
              id: addOnDTO.id,
              name: addOnDTO.name,
              description: addOnDTO.data?.description,
              price: addOnDTO.price,
              isSelected: false,
              questions: questions,
            });
          });

          this.$store.dispatch(
            setAddOnListCheckout({ addOnList: this.addOnList })
          );
        });
    }
  }

  public onAddRemoveAddOn(addOn: AddOn): void {
    this.$store.dispatch(
      setAddOnIsSelectedCheckout({ addOn: addOn, isSelected: addOn.isSelected })
    );
  }
}
