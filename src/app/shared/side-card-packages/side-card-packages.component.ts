import { Component, OnInit } from '@angular/core';
import { SideCadrPackage } from './SideCardPackage';
import { PackagesBox } from './side-card-packages-box/side-card-packages-box.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  checkoutSelectPackage,
  appendQuestionsCheckout,
  setQuestionStepperCheckout,
  setQuestionsCheckout,
} from 'src/app/store/actions/checkout.action';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { LoginParam } from 'src/app/app.config';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { Question } from 'src/models/Question.model';
import { QuestionStepper } from 'src/app/checkout-page/questionnaire/question-stepper/question-stepper.model';
import { convertQuestionsDTOListToQuestionsList } from '../Utilities';

@Component({
  selector: 'app-side-card-packages',
  templateUrl: './side-card-packages.component.html',
  styleUrls: ['./side-card-packages.component.scss'],
})
export class SideCardPackagesComponent implements OnInit {
  public packages: SideCadrPackage[] = [];

  constructor(
    private readonly $store: Store<AppState>,
    private readonly router: Router,
    private readonly CheckOutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.CheckOutService.getAllPackages().subscribe((allPackages) => {
      console.log({ allPackages });

      this.packages = allPackages.map((packageDTO) => {
        const buffQuestions = convertQuestionsDTOListToQuestionsList(
          packageDTO.additional_data.questions
        );

        const box = new PackagesBox(
          packageDTO.name,
          packageDTO.price,
          packageDTO.data.description,
          packageDTO.additional_data.type,
          buffQuestions
        );
        return new SideCadrPackage(box, []);
      });
    });
  }

  public onSelectEvent(box: PackagesBox): void {
    this.$store.dispatch(checkoutSelectPackage({ packageBox: box }));
    console.log({ box });

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
    this.router.navigate([`/${MainRouterPaths.LOGIN}`], {
      queryParams: {
        login: LoginParam.LOGIN,
      },
      queryParamsHandling: 'merge',
    });
  }
}
