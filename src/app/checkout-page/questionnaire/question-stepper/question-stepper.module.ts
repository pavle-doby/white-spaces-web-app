import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionStepperComponent } from './question-stepper.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [QuestionStepperComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [QuestionStepperComponent],
})
export class QuestionStepperModule {}
