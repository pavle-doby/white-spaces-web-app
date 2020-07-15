import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input()
  public toShowDescription: boolean;

  @Output()
  public showDescEvent: EventEmitter<boolean>;
  @Output()
  public hideDescEvent: EventEmitter<boolean>;
  @Output()
  public stateChangesEvent: EventEmitter<boolean>;

  constructor() {
    this.toShowDescription = false;
    this.showDescEvent = new EventEmitter();
    this.hideDescEvent = new EventEmitter();
    this.stateChangesEvent = new EventEmitter();
  }

  ngOnInit(): void {}

  public showDescription(): void {
    this.toShowDescription = true;
    
    this.showDescEvent.emit(true);
    this.stateChangesEvent.emit(true);
  }

  public hideDescription(): void {
    this.toShowDescription = false;

    this.hideDescEvent.emit(false);
    this.stateChangesEvent.emit(false);
  }
}
