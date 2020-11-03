import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyDialogComponent } from './privacy-policy-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

const MaterialModules = [MatDialogModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [PrivacyPolicyDialogComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModules],
  exports: [PrivacyPolicyDialogComponent],
})
export class PrivacyPolicyDialogModule {}
