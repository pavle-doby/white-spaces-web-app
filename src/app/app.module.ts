import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OpeningLabelModule } from './shared/opening-label/opening-label.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { YouGetDialogModule } from './home-page/you-get/you-get-dialog/you-get-dialog.module';
import { YouGetDialogComponent } from './home-page/you-get/you-get-dialog/you-get-dialog.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CheckoutPageModule } from './checkout-page/checkout-page.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { COOKIE_CONFIG } from './app.config';
import { httpInterceptorProviders } from './interceptors/interseptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    NgxGoogleAnalyticsModule.forRoot(
      document.cookie && environment.production ? 'G-2RFP944R90' : ''
    ),
    NgxGoogleAnalyticsRouterModule,
    NgcCookieConsentModule.forRoot(COOKIE_CONFIG),
    StoreDevtoolsModule.instrument(),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    OpeningLabelModule,
    MatDialogModule,
    CheckoutPageModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [YouGetDialogComponent],
})
export class AppModule {}
