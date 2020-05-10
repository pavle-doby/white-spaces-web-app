import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FooterModule, NavbarModule],
  exports: [],
})
export class SharedModule {}
