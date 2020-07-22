import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardPackagesComponent } from './side-card-packages.component';
import { SideCardModule } from '../side-card/side-card.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideCardPackagesBoxModule } from './side-card-packages-box/side-card-packages-box.module';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';

@NgModule({
  declarations: [SideCardPackagesComponent],
  imports: [
    CommonModule,
    SideCardModule,
    FlexLayoutModule,
    SideCardPackagesBoxModule,
    GradientDirectiveModule,
  ],
  exports: [SideCardPackagesComponent],
})
export class SideCardPackagesModule {}
