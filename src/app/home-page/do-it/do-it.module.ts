import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoItComponent } from './do-it.component';

@NgModule({
  declarations: [DoItComponent],
  imports: [CommonModule],
  exports: [DoItComponent],
})
export class DoItModule {}
