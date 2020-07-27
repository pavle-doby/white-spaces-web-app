import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SideCadrPackage } from '../SideCardPackage';

export enum PackageType {
  SMALL = 'S // SMALL',
  MEDIUM = 'M // MEDIUM',
  LARGE = 'L // LARGE',
}

export class PackagesBox {
  constructor(
    public type: PackageType,
    public price: number,
    public description: string
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
