import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOnsComponent } from './add-ons.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AddOnsComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [AddOnsComponent],
})
export class AddOnsModule {}
