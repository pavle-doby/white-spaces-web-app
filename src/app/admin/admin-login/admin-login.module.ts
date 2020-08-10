import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_IMPORTS = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatInputModule,
];
@NgModule({
  declarations: [AdminLoginComponent],
  imports: [CommonModule, MATERIAL_IMPORTS],
  exports: [AdminLoginComponent],
})
export class AdminLoginModule {}
