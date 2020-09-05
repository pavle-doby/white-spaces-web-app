import { Component, OnInit, Input } from '@angular/core';
import { InfoPrice } from '../../../models/InfoPrice.model';

export class InfoPriceLabelInputs {
  public label: string;
  public infoPriceList?: InfoPrice[];

  constructor(obj: InfoPriceLabelInputs) {
    this.label = obj.label;
    this.infoPriceList = Array.isArray(obj.infoPriceList)
      ? [...obj.infoPriceList]
      : [];
  }
}

@Component({
  selector: 'app-info-price-label',
  templateUrl: './info-price-label.component.html',
  styleUrls: ['./info-price-label.component.scss'],
})
export class InfoPriceLabelComponent implements OnInit {
  @Input()
  public label: string;
  @Input()
  public infoPriceList: InfoPrice[] = [];
  @Input()
  public isPriceBold: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
