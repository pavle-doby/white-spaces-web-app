import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksComponent } from './works.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TitleModule } from 'src/app/shared/title/title.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [WorksComponent],
  imports: [CommonModule, FlexLayoutModule, TitleModule, SharedModule],
  exports: [WorksComponent],
})
export class WorksModule {}
