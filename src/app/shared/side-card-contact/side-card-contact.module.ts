import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardContactComponent } from './side-card-contact.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideCardModule } from '../side-card/side-card.module';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SideCardContactComponent],
  imports: [
    CommonModule,
    SideCardModule,
    FlexLayoutModule,
    GradientDirectiveModule,
    FormsModule,
  ],
  exports: [SideCardContactComponent],
})
export class SideCardContactModule {}
