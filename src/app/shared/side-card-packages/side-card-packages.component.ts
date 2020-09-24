import { Component, OnInit } from '@angular/core';
import { SideCadrPackage } from './SideCardPackage';
import { PackagesBox } from './side-card-packages-box/side-card-packages-box.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  checkoutSelectPackage,
  setQuestionStepperCheckout,
  setQuestionsCheckout,
  setAllPackagesCheckout,
} from 'src/app/store/actions/checkout.action';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { BREAKING_POINT_PX, LoginParam } from 'src/app/app.config';
import { QuestionStepper } from 'src/app/checkout-page/questionnaire/question-stepper/question-stepper.model';
import { convertQuestionsDTOListToQuestionsList, getClientWidthPX } from '../Utilities';
import { async } from '@angular/core/testing';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { closeNavbarCard } from 'src/app/store/actions/navbar.actions';
import { EVERY_PACKAGE_INCLUDES } from './side-card-packages.content';

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
        const buffQuestions = convertQuestionsDTOListToQuestionsList(
          packageDTO.additional_data.questions,
          packageDTO
        );
        const box = new PackagesBox(
          packageDTO.name,
          packageDTO.price,
          packageDTO.data.description,
          packageDTO.additional_data.type,
          buffQuestions,
          packageDTO.id
        );

        return new SideCadrPackage(box, []);
      });
    });
  }

  public onSelectEvent(box: PackagesBox): void {
    this.$store.dispatch(closeNavbarCard());
    this.$store.dispatch(checkoutSelectPackage({ packageBox: box }));
    this.$store.dispatch(setQuestionsCheckout({ questions: box.questions }));
    this.$store.dispatch(
      setQuestionStepperCheckout({
        questionStepper: new QuestionStepper({
          rangeStart: 0,
          rangeEnd: 15,
          numberOfRangeToShow: 16,
          numberOfSteps: box.questions.length,
          indexCurrent: 0,
        }),
      })
    );

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
