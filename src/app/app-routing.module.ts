import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { ThankYouPageComponent } from './checkout-page/thank-you-page/thank-you-page.component';
import { SideCardAboutComponent } from './shared/side-card-about/side-card-about.component';
import { SideCardContactComponent } from './shared/side-card-contact/side-card-contact.component';
import { SideCardFqaComponent } from './shared/side-card-fqa/side-card-fqa.component';
import { SideCardPackagesComponent } from './shared/side-card-packages/side-card-packages.component';

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
  {
    path: MainRouterPaths.PACKAGES,
    component: SideCardPackagesComponent,
  },
  {
    path: MainRouterPaths.FQAS,
    component: SideCardFqaComponent,
  },
  {
    path: MainRouterPaths.ABOUT,
    component: SideCardAboutComponent,
  },
  {
    path: MainRouterPaths.CONTACT,
    component: SideCardContactComponent,
  },
  {
    path: MainRouterPaths.THANK_YOU,
    component: ThankYouPageComponent,
  },
  {
    path: '**',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
