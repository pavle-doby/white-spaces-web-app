import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuestionModule } from './question/question.module';
import { QuestionStepperModule } from './question-stepper/question-stepper.module';
import { GradientDirectiveModule } from 'src/app/shared/directives/gradient.directive.module';
import { UploadModule } from 'src/app/shared/upload/upload.module';

@NgModule({
  declarations: [QuestionnaireComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    QuestionModule,
    QuestionStepperModule,
    GradientDirectiveModule,
    UploadModule,
  ],
  exports: [QuestionnaireComponent],
})
export class QuestionnaireModule {}
