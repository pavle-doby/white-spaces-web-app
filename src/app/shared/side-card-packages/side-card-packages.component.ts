import { Component, OnInit } from '@angular/core';
import { PACKAGES } from './side-card-packages.content';
import { SideCadrPackage } from './SideCardPackage';
import { PackagesBox } from './side-card-packages-box/side-card-packages-box.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { checkoutSelectPackage } from 'src/app/store/actions/checkout.action';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths';

@Component({
  selector: 'app-side-card-packages',
  templateUrl: './side-card-packages.component.html',
  styleUrls: ['./side-card-packages.component.scss'],
})
export class SideCardPackagesComponent implements OnInit {
  public readonly packages: SideCadrPackage[] = PACKAGES;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  public onSelectEvent(box: PackagesBox): void {
    this.$store.dispatch(checkoutSelectPackage({ packageBox: box }));
    this.router.navigateByUrl(`/${MainRouterPaths.LOGIN}`);
  }
}
