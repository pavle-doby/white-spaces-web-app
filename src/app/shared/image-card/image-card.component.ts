import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMG_PLACHOLDER } from 'src/app/app.config';
import { Image } from 'src/models/Image.model';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() image: Image;

  @Output() deleteEvent: EventEmitter<Image>;
  @Output() errorLoadingSrc: EventEmitter<Image>;

  public showDeleteIcon: boolean = false;

  constructor() {
    this.deleteEvent = new EventEmitter();
    this.errorLoadingSrc = new EventEmitter();
  }

  ngOnInit(): void {}

  delete(): void {
    this.deleteEvent.emit(this.image);
  }

  onMouseEneter(): void {
    this.showDeleteIcon = true;
  }

  onMouseLeave(): void {
    this.showDeleteIcon = false;
  }

  onError(err): void {
    this.image.src = IMG_PLACHOLDER;
    console.error(err);
    this.errorLoadingSrc.emit(this.image);
  }
}
