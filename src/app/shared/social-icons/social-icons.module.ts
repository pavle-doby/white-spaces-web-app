import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialIconsComponent } from './social-icons.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SocialIconsComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [SocialIconsComponent],
})
export class SocialIconsModule {}
