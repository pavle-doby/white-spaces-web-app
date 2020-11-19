import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GradientDirectiveModule } from 'src/app/shared/directives/gradient.directive.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, FlexLayoutModule, RouterModule, FormsModule],
  exports: [RegisterComponent],
})
export class RegisterModule {}
