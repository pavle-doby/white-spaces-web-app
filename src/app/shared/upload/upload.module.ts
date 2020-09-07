import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';

@NgModule({
  declarations: [UploadComponent],
  imports: [CommonModule, FlexLayoutModule, GradientDirectiveModule],
  exports: [UploadComponent],
})
export class UploadModule {}
