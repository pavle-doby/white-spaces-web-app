import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPageComponent } from './nav-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NavPageComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [NavPageComponent],
})
export class NavPageModule {}
