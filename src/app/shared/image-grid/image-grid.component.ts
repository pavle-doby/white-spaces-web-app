import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Image } from 'src/models/Image.model';
import { ImageGridConfig } from './models/ImageGridConfig.model';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent implements OnInit, OnChanges {
  @Input() public images: Image[] = [];
  @Input() public config: ImageGridConfig;

  @Output() deleteEvent: EventEmitter<Image>;

  public stateList: Image[] = [];

  constructor() {
    this.config = new ImageGridConfig({});

    this.deleteEvent = new EventEmitter();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.stateList = new Array(this.config.limit).fill(
      new Image({ src: this.config.imgPlacholder }),
      0,
      this.config.limit
    );

    (this.images || []).forEach((img, i) => {
      this.stateList[i] = { ...img };
    });
  }

  setLoadingImages(): void {
    this.stateList = this.stateList.map(
      (_) => new Image({ src: this.config.imgLoading })
    );
  }

  deleteImage(img: Image, i): void {
    console.log({ img, i });
    //Refactor to go with id...
    this.deleteEvent.emit(img);
  }
}
