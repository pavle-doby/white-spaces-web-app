import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title.component';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';

@NgModule({
  declarations: [TitleComponent],
  imports: [CommonModule, GradientDirectiveModule],
  exports: [TitleComponent],
})
export class TitleModule {}
