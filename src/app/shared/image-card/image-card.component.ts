import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;

  @Output() deleteEvent: EventEmitter<string>;

  public showDeleteIcon: boolean = false;

  constructor() {
    this.deleteEvent = new EventEmitter();
  }

  ngOnInit(): void {}

  delete(): void {
    this.deleteEvent.emit(this.src);
  }

  onMouseEneter(): void {
    this.showDeleteIcon = true;
  }

  onMouseLeave(): void {
    this.showDeleteIcon = false;
  }
}
