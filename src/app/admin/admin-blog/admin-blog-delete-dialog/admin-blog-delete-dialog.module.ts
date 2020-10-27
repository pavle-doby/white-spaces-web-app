import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBlogDeleteDialogComponent } from './admin-blog-delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AdminBlogDeleteDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class AdminBlogDeleteDialogModule {}
