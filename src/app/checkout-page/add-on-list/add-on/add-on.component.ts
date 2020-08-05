import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddOn } from 'src/models/AddOn';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { setAddOnIsSelectedCheckout } from 'src/app/store/actions/checkout.action';

const ADD = 'Add';
const REMOVE = 'Remove';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: ['./add-on.component.scss'],
})
export class AddOnComponent implements OnInit {
  @Input()
  public addOn: AddOn;
  @Input()
  public toShowDescription: boolean = false;

  @Output()
  public addRemoveAddOnEvent: EventEmitter<AddOn>;

  public addRemoveLabel: string = ADD;

  constructor() {
    this.addRemoveAddOnEvent = new EventEmitter();
  }

  ngOnInit(): void {}

  public showDescription(): void {
    this.toShowDescription = true;
  }

  public hideDescription(): void {
    this.toShowDescription = false;
  }

  public clickOnAddOn(): void {
    const newAddOn = { ...this.addOn, isSelected: !this.addOn.isSelected };
    this.addRemoveAddOnEvent.emit(newAddOn);
    this.addRemoveLabel = this.addOn.isSelected ? REMOVE : ADD;
  }
}
