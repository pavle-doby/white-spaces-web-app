import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddonListComponent } from './addon-list.component';

@NgModule({
  declarations: [AddonListComponent],
  imports: [CommonModule],
  exports: [AddonListComponent],
})
export class AddonListModule {}
