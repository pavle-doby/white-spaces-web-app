import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: MainRouterPaths.HOME,
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: MainRouterPaths.BLOG,
    loadChildren: () =>
      import('./blog-page/blog-page.module').then((m) => m.BlogPageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: MainRouterPaths.CHECKOUT,
    loadChildren: () =>
      import('./checkout-page/checkout-page.module').then(
        (m) => m.CheckoutPageModule
      ),
  },
  {
    path: MainRouterPaths.LOGIN,
    loadChildren: () =>
      import('./login-page/login-page.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
