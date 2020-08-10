import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuestionComponent],
  imports: [CommonModule, FlexLayoutModule, FormsModule],
  exports: [QuestionComponent],
})
export class QuestionModule {}
