import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardAboutComponent } from './side-card-about.component';
import { SideCardModule } from '../side-card/side-card.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';

@NgModule({
  declarations: [SideCardAboutComponent],
  imports: [
    CommonModule,
    SideCardModule,
    FlexLayoutModule,
    GradientDirectiveModule,
  ],
  exports: [SideCardAboutComponent],
})
export class SideCardAboutModule {}
