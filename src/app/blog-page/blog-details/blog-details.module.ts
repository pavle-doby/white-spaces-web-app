import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsComponent } from './blog-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { AttachmentModule } from 'src/app/shared/attachment/attachment.module';
import { SocialIconsShareModule } from 'src/app/shared/social-icons-share/social-icons-share.module';
import { LogoModule } from 'src/app/shared/logo/logo.module';

@NgModule({
  declarations: [BlogDetailsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    AttachmentModule,
    SocialIconsShareModule,
    LogoModule,
  ],
  exports: [BlogDetailsComponent],
})
export class BlogDetailsModule {}
