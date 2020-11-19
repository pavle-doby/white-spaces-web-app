import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOnComponent } from './add-on.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GradientDirectiveModule } from 'src/app/shared/directives/gradient.directive.module';

@NgModule({
  declarations: [AddOnComponent],
  imports: [CommonModule, FlexLayoutModule, GradientDirectiveModule],
  exports: [AddOnComponent],
})
export class AddOnModule {}
