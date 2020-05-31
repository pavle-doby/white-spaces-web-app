import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageDescriptionModule } from './image-description/image-description.module';
import { ImageDescriptionComponent } from './image-description/image-description.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, FooterModule, NavbarModule, ImageDescriptionModule],
  exports: [FooterComponent, NavbarComponent, ImageDescriptionComponent],
})
export class SharedModule {}
