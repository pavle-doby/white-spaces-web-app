import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SideCadrPackage } from '../SideCardPackage';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { Question } from 'src/models/Question.model';
import { CURRENCY } from 'src/app/app.config';

export enum PackageType {
  SMALL = 'S',
  MEDIUM = 'M',
  LARGE = 'L',
}

export class PackagesBox {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public type: PackageType | string,
    public questions: Question[] = [],
    public id?: any
  ) {}
}

@Component({
  selector: 'app-side-card-packages-box',
  templateUrl: './side-card-packages-box.component.html',
  styleUrls: ['./side-card-packages-box.component.scss'],
})
export class SideCardPackagesBoxComponent implements OnInit {
  @Input()
  public package: SideCadrPackage;
  @Input()
  public isSelected?: boolean = false;

  @Output()
  public selectEvent: EventEmitter<PackagesBox>;
  @Output()
  public continueEvent: EventEmitter<void>;

  public readonly currency = CURRENCY;

  constructor() {
    this.selectEvent = new EventEmitter();
    this.continueEvent = new EventEmitter();
  }

  ngOnInit(): void {}

  public selectPackage(box: PackagesBox): void {
    this.selectEvent.emit(box);
  }

  public continue(): void {
    this.continueEvent.emit();
  }
}
