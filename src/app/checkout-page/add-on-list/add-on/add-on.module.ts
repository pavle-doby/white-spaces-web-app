import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOnComponent } from './add-on.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AddOnComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [AddOnComponent],
})
export class AddOnModule {}
