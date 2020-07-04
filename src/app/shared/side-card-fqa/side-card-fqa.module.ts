import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCardFqaComponent } from './side-card-fqa.component';
import { SideCardModule } from '../side-card/side-card.module';

@NgModule({
  declarations: [SideCardFqaComponent],
  imports: [CommonModule, SideCardModule],
  exports: [SideCardFqaComponent],
})
export class SideCardFqaModule {}
