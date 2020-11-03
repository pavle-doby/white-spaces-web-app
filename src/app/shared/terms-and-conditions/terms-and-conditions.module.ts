import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const MaterialModules = [MatDialogModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModules],
  exports: [TermsAndConditionsComponent],
})
export class TermsAndConditionsModule {}
