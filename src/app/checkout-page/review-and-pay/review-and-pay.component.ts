import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { setInfoCheckout } from 'src/app/store/actions/checkout.action';
import { KeyValue } from '@angular/common';
import { KeyValuePair } from 'src/models/KeyValuePair.model';

@Component({
  selector: 'app-review-and-pay',
  templateUrl: './review-and-pay.component.html',
  styleUrls: ['./review-and-pay.component.scss'],
})
export class ReviewAndPayComponent implements OnInit {
  public projectName: string;
  public customerName: string;
  public packageName: KeyValuePair<string, number>;
  public addOnList: KeyValuePair<string, number>[];
  public total: number;

  constructor(private readonly $store: Store<AppState>) {
    this.$store.dispatch(setInfoCheckout({ info: '', description: [] }));
  }

  ngOnInit(): void {}
}
