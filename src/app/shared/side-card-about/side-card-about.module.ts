import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardAboutComponent } from './side-card-about.component';
import { SideCardModule } from '../side-card/side-card.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SideCardAboutComponent],
  imports: [CommonModule, SideCardModule, FlexLayoutModule],
  exports: [SideCardAboutComponent],
})
export class SideCardAboutModule {}
