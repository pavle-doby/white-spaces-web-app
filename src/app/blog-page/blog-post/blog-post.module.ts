import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonMonochromeModule } from 'src/app/shared/button-monochrome/button-monochrome.module';
import { AttachmentModule } from 'src/app/shared/attachment/attachment.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogDialogModule } from '../blog-dialog/blog-dialog.module';

const MATERIAL_IMPORTS = [MatDialogModule];
@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ButtonMonochromeModule,
    AttachmentModule,
    MATERIAL_IMPORTS,
    BlogDialogModule,
  ],
  exports: [BlogPostComponent],
})
export class BlogPostModule {}
