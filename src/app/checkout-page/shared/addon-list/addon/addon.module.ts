import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddonComponent } from './addon.component';

@NgModule({
  declarations: [AddonComponent],
  imports: [CommonModule],
  exports: [AddonComponent],
})
export class AddonModule {}
