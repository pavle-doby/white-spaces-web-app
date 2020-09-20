import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarSmallSrceenComponent } from './navbar-small-srceen.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoModule } from '../logo/logo.module';

const MaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
];

@NgModule({
  declarations: [NavbarSmallSrceenComponent],
  imports: [
    CommonModule,
    MaterialModules,
    LayoutModule,
    FlexLayoutModule,
    LogoModule,
  ],
  exports: [NavbarSmallSrceenComponent],
})
export class NavbarSmallSrceenModule {}
