import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoItComponent } from './do-it.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TitleModule } from 'src/app/shared/title/title.module';

@NgModule({
  declarations: [DoItComponent],
  imports: [CommonModule, FlexLayoutModule, TitleModule],
  exports: [DoItComponent],
})
export class DoItModule {}
