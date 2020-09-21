import { Component, OnInit } from '@angular/core';

const WHAT_YOU_GET_IMGS = [
  `assets/images/home/what-you-get 0.jpg`,
  `assets/images/home/what-you-get 1.jpg`,
  `assets/images/home/what-you-get 2.jpg`,
  `assets/images/home/what-you-get 3.jpg`,
  `assets/images/home/what-you-get 4.jpg`,
  `assets/images/home/what-you-get 5.jpg`,
  `assets/images/home/what-you-get 6.jpg`,
  `assets/images/home/what-you-get 7.jpg`,
  `assets/images/home/what-you-get 8.jpg`,
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
