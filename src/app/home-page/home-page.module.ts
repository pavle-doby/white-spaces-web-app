import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeModule } from './home/home.module';
import { BelieveInModule } from './believe-in/believe-in.module';
import { DoItModule } from './do-it/do-it.module';
import { WorksModule } from './works/works.module';
import { YouGetModule } from './you-get/you-get.module';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ParallaxDirectiveModule } from '../shared/directives/parallax.directive.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HomePageRoutingModule,
    SharedModule,
    HomeModule,
    BelieveInModule,
    DoItModule,
    WorksModule,
    YouGetModule,
    InfiniteScrollModule,
    ParallaxDirectiveModule,
  ],
  exports: [HomePageComponent],
})
export class HomePageModule {}
