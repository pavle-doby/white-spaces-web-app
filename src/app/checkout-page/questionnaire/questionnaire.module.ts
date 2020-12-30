import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuestionModule } from './question/question.module';
import { QuestionStepperModule } from './question-stepper/question-stepper.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [QuestionnaireComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    QuestionModule,
    QuestionStepperModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  exports: [QuestionnaireComponent],
})
export class QuestionnaireModule {}
