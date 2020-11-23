import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isHandset } from '../Utilities';

@Component({
  selector: 'app-opening-label',
  templateUrl: './opening-label.component.html',
  styleUrls: ['./opening-label.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0.33 }),
        animate('.33s ease-in', style({ opacity: 1 })),
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
  @Input()
  public toToggleOnClick: boolean = isHandset();
  @Input()
  public showDebounceTime: number = 0;
  @Input()
  public hideDebounceTime: number = 0;

  @Output()
  public showDescEvent: EventEmitter<boolean>;
  @Output()
  public hideDescEvent: EventEmitter<boolean>;
  @Output()
  public stateChangesEvent: EventEmitter<boolean>;

  public hideSubject: Subject<void>;
  public subHideSubject: Subscription;

  public showSubject: Subject<void>;
  public subShowSubject: Subscription;

  constructor() {
    this.toShowDescription = false;
    this.showDescEvent = new EventEmitter();
    this.hideDescEvent = new EventEmitter();
    this.stateChangesEvent = new EventEmitter();

    this.hideSubject = new Subject();
    this.showSubject = new Subject();
  }

  ngOnInit(): void {
    this.subHideSubject = this.hideSubject
      .pipe(debounceTime(this.hideDebounceTime))
      .subscribe(() => {
        this.hideDescription();
      });
    this.subShowSubject = this.showSubject
      .pipe(debounceTime(this.showDebounceTime))
      .subscribe(() => {
        this.showDescription();
      });
  }

  public showDescription(): void {
    if (this.toToggleOnClick) {
      return;
    }

    this.toShowDescription = true;

    this.showDescEvent.emit(true);
    this.stateChangesEvent.emit(true);
  }

  public hideDescription(): void {
    if (this.toToggleOnClick) {
      return;
    }

    this.toShowDescription = false;

    this.hideDescEvent.emit(false);
    this.stateChangesEvent.emit(false);
  }

  public onClick(): void {
    if (!this.toToggleOnClick) {
      return;
    }

    this.toShowDescription = !this.toShowDescription;

    this.showDescEvent.emit(this.toShowDescription);
    this.stateChangesEvent.emit(this.toShowDescription);
  }
}
