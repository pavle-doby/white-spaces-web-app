import { Component, OnInit } from '@angular/core';
import { PackagesBox } from './side-card-packages-box/side-card-packages-box.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { checkoutSelectPackage } from 'src/app/store/actions/checkout.action';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { BREAKING_POINT_PX, LoginParam } from 'src/app/app.config';
import { getClientWidthPX } from '../Utilities';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Observable } from 'rxjs';
import { closeNavbarCard } from 'src/app/store/actions/navbar.actions';
import { EVERY_PACKAGE_INCLUDES } from './side-card-packages.content';

@Component({
  selector: 'app-side-card-packages',
  templateUrl: './side-card-packages.component.html',
  styleUrls: ['./side-card-packages.component.scss'],
})
export class SideCardPackagesComponent implements OnInit {
  public checkoutState$: Observable<CheckoutState>;
  public selectedPackageBox$: Observable<PackagesBox>;

  public everyPackageIncludes: string[] = EVERY_PACKAGE_INCLUDES;

  public isHandset: boolean;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly router: Router
  ) {
    this.checkoutState$ = this.$store.select((state) => state.checkout);
    this.selectedPackageBox$ = this.$store.select(
      (state) => state.checkout.packageBox
    );
  }

  async ngOnInit(): Promise<void> {
    this.isHandset = BREAKING_POINT_PX > getClientWidthPX();
  }

  public onSelectEvent(packageBox: PackagesBox): void {
    this.$store.dispatch(closeNavbarCard());
    this.$store.dispatch(checkoutSelectPackage({ packageBox }));

    this.router.navigateByUrl(
      `/${MainRouterPaths.LOGIN}?login=${LoginParam.REGISTER}`
    );
  }

  public onContinueEvent(): void {
    this.$store.dispatch(closeNavbarCard());
    this.router.navigateByUrl(
      `/${MainRouterPaths.LOGIN}?login=${LoginParam.LOGIN}`
    );
  }
}
