import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouGetDialogComponent } from './you-get-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

const MaterialModules = [MatDialogModule, MatButtonModule];

@NgModule({
  declarations: [YouGetDialogComponent],
  imports: [CommonModule, MaterialModules, FlexLayoutModule],
  exports: [YouGetDialogComponent, MaterialModules],
  entryComponents: [YouGetDialogComponent],
})
export class YouGetDialogModule {}
