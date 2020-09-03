import { Component, OnInit, Input } from '@angular/core';
import { TitleSize } from './TitleSize';

const DEFAULT_GRADIENT = `linear-gradient(90deg, rgba(0, 212, 255, 1) 0%, rgba(9, 9, 121, 1) 55%, rgba(2, 0, 36, 1) 100%)`;

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input()
  public text: string;
  @Input()
  public size?: TitleSize;
  @Input()
  public gradient: string;

  public gradientStyle: { 'background-image': string };
  public sizeClass: Record<string, boolean>;

  constructor() {
    this.sizeClass = {};
  }

  ngOnInit(): void {
    this.size = this.size || TitleSize.NORMAL_BOLD;
    this.sizeClass[this.size] = true;
    // this.gradientStyle = {
    //   'background-image': this.gradient || DEFAULT_GRADIENT,
    // };
    // this.gradientStyle = { nesto: true };
  }
}
