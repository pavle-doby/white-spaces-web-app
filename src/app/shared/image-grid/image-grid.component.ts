import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IMG_LOADING, IMG_PLACHOLDER } from 'src/app/app.config';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent implements OnInit, OnChanges {
  @Input()
  public urls: string[];

  public stateList: string[] = [];
  public n = 16;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.stateList = new Array(this.n).fill(IMG_PLACHOLDER, 0, this.n);

    this.urls.forEach((url, i) => {
      this.stateList[i] = url;
    });
  }

  setLoadingImages(): void {
    this.stateList = this.stateList.map((_) => IMG_LOADING);
  }
}
