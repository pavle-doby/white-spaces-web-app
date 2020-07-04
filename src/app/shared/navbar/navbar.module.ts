import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideCardFqaModule } from '../side-card-fqa/side-card-fqa.module';
import { SideCardPackagesModule } from '../side-card-packages/side-card-packages.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SideCardFqaModule,
    SideCardPackagesModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
