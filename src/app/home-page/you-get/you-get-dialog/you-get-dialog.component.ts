import { Component, OnInit } from '@angular/core';

const WHAT_YOU_GET_IMGS = [
  `assets/images/home/what-you-get 0.png`,
  `assets/images/home/what-you-get 1.png`,
  `assets/images/home/what-you-get 2.png`,
  `assets/images/home/what-you-get 3.png`,
  `assets/images/home/what-you-get 4.png`,
  `assets/images/home/what-you-get 5.png`,
  `assets/images/home/what-you-get 6.png`,
  `assets/images/home/what-you-get 7.png`,
  `assets/images/home/what-you-get 8.png`,
];

@Component({
  selector: 'app-you-get-dialog',
  templateUrl: './you-get-dialog.component.html',
  styleUrls: ['./you-get-dialog.component.scss'],
})
export class YouGetDialogComponent implements OnInit {
  public readonly images: string[];

  constructor() {
    this.images = WHAT_YOU_GET_IMGS;
  }

  ngOnInit(): void {}
}
