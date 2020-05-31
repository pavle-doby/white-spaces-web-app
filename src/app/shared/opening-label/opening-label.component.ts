import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-opening-label',
  templateUrl: './opening-label.component.html',
  styleUrls: ['./opening-label.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.25s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class OpeningLabelComponent implements OnInit {
  @Input()
  public label: string;
  @Input()
  public description: string;

  public toShowDescription: boolean;

  constructor() {
    this.toShowDescription = false;
  }

  ngOnInit(): void {}

  public showDescription(): void {
    this.toShowDescription = true;
  }

  public hideDescription(): void {
    this.toShowDescription = false;
  }
}
