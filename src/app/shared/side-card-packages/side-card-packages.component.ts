import { Component, OnInit } from '@angular/core';
import { PACKAGES } from './side-card-packages.content';
import { SideCadrPackage } from './SideCardPackage';
import { PackagesBox } from './side-card-packages-box/side-card-packages-box.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectPackage } from 'src/app/store/actions/checkout.action';

@Component({
  selector: 'app-side-card-packages',
  templateUrl: './side-card-packages.component.html',
  styleUrls: ['./side-card-packages.component.scss'],
})
export class SideCardPackagesComponent implements OnInit {
  public readonly packages: SideCadrPackage[] = PACKAGES;

  constructor(private readonly $store: Store<AppState>) {}

  ngOnInit(): void {}

  public onSelectEvent(box: PackagesBox): void {
    this.$store.dispatch(selectPackage({ packageBox: box }));
  }
}
