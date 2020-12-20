import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IMG_LOADING, IMG_PLACHOLDER } from 'src/app/app.config';
import { ImageGridConfig } from './models/ImageGridConfig.model';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent implements OnInit, OnChanges {
  @Input() public urls: string[] = [];
  @Input() public config: ImageGridConfig;

  @Output() deleteEvent: EventEmitter<string>;

  public stateList: string[] = [];

  constructor() {
    this.config = new ImageGridConfig({});

    this.deleteEvent = new EventEmitter();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.stateList = new Array(this.config.limit).fill(
      this.config.imgPlacholder,
      0,
      this.config.limit
    );

    (this.urls || []).forEach((url, i) => {
      this.stateList[i] = url;
    });
  }

  setLoadingImages(): void {
    this.stateList = this.stateList.map((_) => this.config.imgLoading);
  }

  deleteImage(src, i): void {
    console.log({ src, i });
    //Refactor to go with id...
    this.deleteEvent.emit(src);
  }
}
