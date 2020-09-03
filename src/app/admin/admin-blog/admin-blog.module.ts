import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBlogComponent } from './admin-blog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CKEditorModule, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { AdminBlogDialogComponent } from './admin-blog-dialog/admin-blog-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AdminBlogComponent, AdminBlogDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    CKEditorModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
  exports: [AdminBlogComponent],
  entryComponents: [AdminBlogDialogComponent, CKEditorComponent],
})
export class AdminBlogModule {}
