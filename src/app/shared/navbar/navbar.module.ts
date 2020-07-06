import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideCardFqaModule } from '../side-card-fqa/side-card-fqa.module';
import { SideCardPackagesModule } from '../side-card-packages/side-card-packages.module';
import { SideCardAboutModule } from '../side-card-about/side-card-about.module';
import { SideCardContactModule } from '../side-card-contact/side-card-contact.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SideCardFqaModule,
    SideCardPackagesModule,
    SideCardAboutModule,
    SideCardContactModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
