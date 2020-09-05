import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SideCadrPackage } from '../SideCardPackage';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { Question } from 'src/models/Question.model';

export enum PackageType {
  SMALL = 'S',
  MEDIUM = 'M',
  LARGE = 'L',
}

export class PackagesBox {
  public id: any;

  constructor(
    public name: string,
    public price: number,
    public description: string,
    public type: PackageType,
    public questions: Question[] = []
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

  @Output()
  public selectEvent: EventEmitter<PackagesBox>;

  public isPackageSelected: boolean = false;

  constructor() {
    this.selectEvent = new EventEmitter();
  }

  ngOnInit(): void {}

  public selectPackage(box: PackagesBox): void {
    this.selectEvent.emit(box);
  }
}
