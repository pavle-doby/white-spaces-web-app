import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [InfoComponent],
})
export class InfoModule {}
