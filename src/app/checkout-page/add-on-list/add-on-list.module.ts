import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOnListComponent } from './add-on-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddOnModule } from './add-on/add-on.module';

@NgModule({
  declarations: [AddOnListComponent],
  imports: [CommonModule, FlexLayoutModule, AddOnModule],
  exports: [AddOnListComponent],
})
export class AddOnListModule {}
