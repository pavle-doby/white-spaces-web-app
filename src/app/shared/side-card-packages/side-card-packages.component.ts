import { Component, OnInit } from '@angular/core';
import { SideCadrPackage } from './SideCardPackage';
import { PackagesBox } from './side-card-packages-box/side-card-packages-box.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  checkoutSelectPackage,
  setQuestionsCheckout,
} from 'src/app/store/actions/checkout.action';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { BREAKING_POINT_PX, LoginParam } from 'src/app/app.config';
import { getClientWidthPX } from '../Utilities';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { closeNavbarCard } from 'src/app/store/actions/navbar.actions';
import { EVERY_PACKAGE_INCLUDES } from './side-card-packages.content';
import { ShoppingCart } from 'src/models/ShoppingCart.model';

@Component({
  selector: 'app-side-card-packages',
  templateUrl: './side-card-packages.component.html',
  styleUrls: ['./side-card-packages.component.scss'],
})
export class SideCardPackagesComponent implements OnInit {
  public packages: SideCadrPackage[] = [];
  public checkoutState$: Observable<CheckoutState>;
  public selectedPackageBox$: Observable<PackagesBox>;
  public everyPackageIncludes: string[] = EVERY_PACKAGE_INCLUDES;
  public isHandset: boolean;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly router: Router,
    private readonly CheckOutService: CheckoutService
  ) {
    this.checkoutState$ = this.$store.select((state) => state.checkout);
    this.selectedPackageBox$ = this.$store.select(
      (state) => state.checkout.packageBox
    );
  }

  ngOnInit(): void {
    this.isHandset = BREAKING_POINT_PX > getClientWidthPX();

    this.CheckOutService.getAllPackages().subscribe(async (allPackages) => {
      LocalStorageService.Instance.PackageCategroyId = allPackages?.length
        ? allPackages[0].category_id
        : null;

      this.packages = allPackages.map((packageDTO) => {
        const box = ShoppingCart.convertPackageProductToPackageBox(packageDTO);
        return new SideCadrPackage(box, []);
      });
    });
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
