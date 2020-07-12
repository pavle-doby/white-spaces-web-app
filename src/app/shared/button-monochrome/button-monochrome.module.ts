import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonMonochromeComponent } from './button-monochrome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_IMPORTS = [MatButtonModule];
@NgModule({
  declarations: [ButtonMonochromeComponent],
  imports: [CommonModule, FlexLayoutModule, MATERIAL_IMPORTS],
  exports: [ButtonMonochromeComponent],
})
export class ButtonMonochromeModule {}
