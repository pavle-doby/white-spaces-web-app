import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonMonochromeModule } from 'src/app/shared/button-monochrome/button-monochrome.module';
import { AttachmentModule } from 'src/app/shared/attachment/attachment.module';

@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ButtonMonochromeModule,
    AttachmentModule,
  ],
  exports: [BlogPostComponent],
})
export class BlogPostModule {}
