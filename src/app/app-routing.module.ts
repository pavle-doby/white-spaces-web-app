import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./blog-page/blog-page.module').then((m) => m.BlogPageModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout-page/checkout-page.module').then(
        (m) => m.CheckoutPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
