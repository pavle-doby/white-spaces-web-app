import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuestionModule } from './question/question.module';
import { QuestionStepperModule } from './question-stepper/question-stepper.module';
import { GradientDirectiveModule } from 'src/app/shared/directives/gradient.directive.module';

@NgModule({
  declarations: [QuestionnaireComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    QuestionModule,
    QuestionStepperModule,
    GradientDirectiveModule,
  ],
  exports: [QuestionnaireComponent],
})
export class QuestionnaireModule {}
