import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardPackagesComponent } from './side-card-packages.component';
import { SideCardModule } from '../side-card/side-card.module';

@NgModule({
  declarations: [SideCardPackagesComponent],
  imports: [CommonModule, SideCardModule],
  exports: [SideCardPackagesComponent],
})
export class SideCardPackagesModule {}
