import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GradientDirectiveModule } from 'src/app/shared/directives/gradient.directive.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FlexLayoutModule, RouterModule, FormsModule],
  exports: [LoginComponent],
})
export class LoginModule {}
