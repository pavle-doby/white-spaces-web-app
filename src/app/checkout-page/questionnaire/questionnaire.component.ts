import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { checkoutSetInfo } from 'src/app/store/actions/checkout.action';

const INFO = `Feel free to load us with information so that we
can truly get to know both you and your space
and extend its pontential to maximum.`;

const INFO_DESC = `Note that providing us with lots of information will lead
to complete understanding of your needs and 100% project success`;

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  constructor(private readonly $store: Store<AppState>) {
    this.$store.dispatch(
      checkoutSetInfo({ info: INFO, description: [INFO_DESC] })
    );
  }

  ngOnInit(): void {}
}
