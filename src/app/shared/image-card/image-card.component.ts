import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IMG_DWG,
  IMG_LOADING,
  IMG_PDF,
  IMG_PLACHOLDER,
} from 'src/app/app.config';
import { Image } from 'src/models/Image.model';
import { getExtension } from '../Utilities';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnChanges {
  @Input() image: Image;

  @Output() deleteEvent: EventEmitter<Image>;
  @Output() errorLoadingSrc: EventEmitter<Image>;

  public showDeleteIcon: boolean = false;

  constructor() {
    this.deleteEvent = new EventEmitter();
    this.errorLoadingSrc = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    switch (getExtension(this.image.src).toLowerCase()) {
      case '.pdf': {
        this.image.srcToShow = IMG_PDF;
        this.image.alt = 'pdf file';
        break;
      }
      case '.dwg': {
        this.image.srcToShow = IMG_DWG;
        this.image.alt = 'dwg file';
        break;
      }
      default:
        this.image.srcToShow = this.image.src;
        this.image.alt = 'image file';
        break;
    }
  }

  delete(): void {
    this.deleteEvent.emit(this.image);
  }

  onMouseEneter(): void {
    if (this.image.src === IMG_PLACHOLDER || this.image.src === IMG_LOADING) {
      return;
    }
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
