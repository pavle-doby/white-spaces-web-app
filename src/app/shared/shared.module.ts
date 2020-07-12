import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageDescriptionModule } from './image-description/image-description.module';
import { ImageDescriptionComponent } from './image-description/image-description.component';
import { ButtonMonochromeComponent } from './button-monochrome/button-monochrome.component';
import { ButtonMonochromeModule } from './button-monochrome/button-monochrome.module';
import { AttachmentModule } from './attachment/attachment.module';
import { AttachmentComponent } from './attachment/attachment.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FooterModule,
    NavbarModule,
    ImageDescriptionModule,
    ButtonMonochromeModule,
    AttachmentModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    ImageDescriptionComponent,
    ButtonMonochromeComponent,
    AttachmentComponent,
  ],
})
export class SharedModule {}
