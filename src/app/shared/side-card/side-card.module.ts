import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardComponent } from './side-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';

@NgModule({
  declarations: [SideCardComponent],
  imports: [CommonModule, FlexLayoutModule, GradientDirectiveModule],
  exports: [SideCardComponent],
})
export class SideCardModule {}
