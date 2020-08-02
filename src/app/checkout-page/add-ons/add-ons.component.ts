import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { setInfoCheckout } from 'src/app/store/actions/checkout.action';

const INFO = `If you feel like you want more you can easily
customise you package & add extra plans and drawings.`;

const INFO_DESC = `Please note that adding extra plans will require additional
engagement and time for finishing project.`;

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.scss'],
})
export class AddOnsComponent implements OnInit {
  constructor(private readonly $store: Store<AppState>) {
    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC] })
    );
  }

  ngOnInit(): void {}
}
