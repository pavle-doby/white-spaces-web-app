import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-price-label',
  templateUrl: './info-price-label.component.html',
  styleUrls: ['./info-price-label.component.scss'],
})
export class InfoPriceLabelComponent implements OnInit {
  @Input()
  public label: string;
  @Input()
  public infoList: string[];
  @Input()
  public price: number;

  constructor() {}

  ngOnInit(): void {}
}
