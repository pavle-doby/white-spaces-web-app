import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardComponent } from './side-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SideCardComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [SideCardComponent],
})
export class SideCardModule {}
