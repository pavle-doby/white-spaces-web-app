import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [QuestionnaireComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [QuestionnaireComponent],
})
export class QuestionnaireModule {}
