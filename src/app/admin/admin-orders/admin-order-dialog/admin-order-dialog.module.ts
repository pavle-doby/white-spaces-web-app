import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderDialogComponent } from './admin-order-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AdminOrderDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
  ],
  exports: [AdminOrderDialogComponent],
})
export class AdminOrderDialogModule {}
