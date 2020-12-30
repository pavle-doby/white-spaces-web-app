import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOnListComponent } from './add-on-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddOnModule } from './add-on/add-on.module';
import { InfoModule } from 'src/app/shared/info/info.module';

@NgModule({
  declarations: [AddOnListComponent],
  imports: [CommonModule, FlexLayoutModule, AddOnModule, InfoModule],
  exports: [AddOnListComponent],
})
export class AddOnListModule {}
