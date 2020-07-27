import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoModule } from '../shared/logo/logo.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginPageRoutingModule, FlexLayoutModule, LogoModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
