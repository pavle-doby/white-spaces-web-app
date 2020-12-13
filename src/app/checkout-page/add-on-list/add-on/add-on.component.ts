import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isHandset } from 'src/app/shared/Utilities';
import { AddOn } from 'src/models/AddOn';
import { CURRENCY } from '../../../app.config';

const ADD = 'Add';
const REMOVE = 'Added';

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
  public readonly currency = CURRENCY;
  public isHandset: boolean = isHandset();

  constructor() {
    this.addRemoveAddOnEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.addRemoveLabel = this.addOn.isSelected ? REMOVE : ADD;
  }

  public showDescription(): void {
    if (this.isHandset) {
      return;
    }
    this.toShowDescription = true;
  }

  public hideDescription(): void {
    if (this.isHandset) {
      return;
    }
    this.toShowDescription = false;
  }

  public toggleDescription(): void {
    if (!this.isHandset) {
      return;
    }
    this.toShowDescription = !this.toShowDescription;
  }

  public clickOnAddOn(): void {
    const isSelected = !this.addOn.isSelected;
    const newAddOn = { ...this.addOn, isSelected };
    this.addRemoveAddOnEvent.emit(newAddOn);
  }
}
