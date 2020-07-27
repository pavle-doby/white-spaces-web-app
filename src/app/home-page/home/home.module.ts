import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoModule } from 'src/app/shared/logo/logo.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FlexLayoutModule, LogoModule],
  exports: [HomeComponent],
})
export class HomeModule {}
