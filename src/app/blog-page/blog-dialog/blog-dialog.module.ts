import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDialogComponent } from './blog-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BlogDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [BlogDialogComponent],
})
export class BlogDialogModule {}
