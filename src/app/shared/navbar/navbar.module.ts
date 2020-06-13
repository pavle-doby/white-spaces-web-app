import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
