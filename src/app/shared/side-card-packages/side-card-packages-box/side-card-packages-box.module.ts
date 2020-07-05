import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardPackagesBoxComponent } from './side-card-packages-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SideCardPackagesBoxComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [SideCardPackagesBoxComponent],
})
export class SideCardPackagesBoxModule {}
