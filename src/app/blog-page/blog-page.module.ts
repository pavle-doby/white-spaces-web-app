import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from './blog-page.component';
import { BlogPageRoutingModule } from './blog-page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoModule } from '../shared/logo/logo.module';

@NgModule({
  declarations: [BlogPageComponent],
  imports: [
    CommonModule,
    BlogPageRoutingModule,
    SharedModule,
    BlogPostModule,
    FlexLayoutModule,
    LogoModule,
  ],
})
export class BlogPageModule {}
