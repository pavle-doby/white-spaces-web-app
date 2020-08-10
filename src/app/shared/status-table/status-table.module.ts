import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTableComponent } from './status-table.component';

@NgModule({
  declarations: [StatusTableComponent],
  imports: [CommonModule],
  exports: [StatusTableComponent],
})
export class StatusTableModule {}
