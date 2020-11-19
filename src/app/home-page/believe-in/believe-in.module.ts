import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BelieveInComponent } from './believe-in.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpeningLabelModule } from 'src/app/shared/opening-label/opening-label.module';
import { TitleModule } from 'src/app/shared/title/title.module';

@NgModule({
  declarations: [BelieveInComponent],
  imports: [CommonModule, FlexLayoutModule, OpeningLabelModule, TitleModule],
  exports: [BelieveInComponent],
})
export class BelieveInModule {}
