import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from './blog-page.component';
import { BlogPageRoutingModule } from './blog-page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BlogPostModule } from './blog-post/blog-post.module';

@NgModule({
  declarations: [BlogPageComponent],
  imports: [CommonModule, BlogPageRoutingModule, SharedModule, BlogPostModule],
})
export class BlogPageModule {}
