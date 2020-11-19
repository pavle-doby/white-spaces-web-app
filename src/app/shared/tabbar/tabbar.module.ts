import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbarComponent } from './tabbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';

@NgModule({
  declarations: [TabbarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    GradientDirectiveModule,
  ],
  exports: [TabbarComponent],
})
export class TabbarModule {}
