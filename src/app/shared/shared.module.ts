import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageDescriptionModule } from './image-description/image-description.module';
import { ImageDescriptionComponent } from './image-description/image-description.component';
import { SideCardModule } from './side-card/side-card.module';
import { SideCardComponent } from './side-card/side-card.component';
import { SideCardPackagesModule } from './side-card-packages/side-card-packages.module';
import { SideCardFqaModule } from './side-card-fqa/side-card-fqa.module';
import { SideCardPackagesComponent } from './side-card-packages/side-card-packages.component';
import { SideCardFqaComponent } from './side-card-fqa/side-card-fqa.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FooterModule,
    NavbarModule,
    ImageDescriptionModule,
    SideCardModule,
    SideCardPackagesModule,
    SideCardFqaModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    ImageDescriptionComponent,
    SideCardComponent,
    SideCardPackagesComponent,
    SideCardFqaComponent,
  ],
})
export class SharedModule {}
