import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDialogComponent } from './blog-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AttachmentModule } from 'src/app/shared/attachment/attachment.module';
import { SocialIconsModule } from 'src/app/shared/social-icons/social-icons.module';

@NgModule({
  declarations: [BlogDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    AttachmentModule,
    SocialIconsModule,
  ],
  exports: [BlogDialogComponent],
})
export class BlogDialogModule {}
