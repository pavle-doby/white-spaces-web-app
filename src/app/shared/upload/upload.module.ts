import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

const MaterialModules = [MatTooltipModule, MatIconModule];
@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    GradientDirectiveModule,
    MaterialModules,
  ],
  exports: [UploadComponent],
})
export class UploadModule {}
