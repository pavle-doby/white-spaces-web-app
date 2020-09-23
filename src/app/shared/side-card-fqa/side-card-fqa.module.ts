import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardFqaComponent } from './side-card-fqa.component';
import { SideCardModule } from '../side-card/side-card.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpeningLabelModule } from '../opening-label/opening-label.module';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';

@NgModule({
  declarations: [SideCardFqaComponent],
  imports: [
    CommonModule,
    SideCardModule,
    FlexLayoutModule,
    OpeningLabelModule,
    GradientDirectiveModule,
  ],
  exports: [SideCardFqaComponent],
})
export class SideCardFqaModule {}
