import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

import { BlogPageComponent } from './blog-page.component';
import { BlogPath } from './BlogPath.enum';

const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent,
  },
  {
    path: BlogPath.DETAILS,
    component: BlogDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogPageRoutingModule {}
