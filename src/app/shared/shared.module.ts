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
import { SideCardModule } from './side-card/side-card.module';
import { SideCardComponent } from './side-card/side-card.component';
import { SideCardPackagesModule } from './side-card-packages/side-card-packages.module';
import { SideCardFqaModule } from './side-card-fqa/side-card-fqa.module';
import { SideCardPackagesComponent } from './side-card-packages/side-card-packages.component';
import { SideCardFqaComponent } from './side-card-fqa/side-card-fqa.component';
import { UploadGridModule } from './upload-grid/upload-grid.module';
import { UploadGridComponent } from './upload-grid/upload-grid.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FooterModule,
    NavbarModule,
    ImageDescriptionModule,
    ButtonMonochromeModule,
    AttachmentModule,
    SideCardModule,
    SideCardPackagesModule,
    SideCardFqaModule,
    UploadGridModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    ImageDescriptionComponent,
    ButtonMonochromeComponent,
    AttachmentComponent,
    SideCardComponent,
    SideCardPackagesComponent,
    SideCardFqaComponent,
    UploadGridComponent,
  ],
})
export class SharedModule {}
