import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-monochrome',
  templateUrl: './button-monochrome.component.html',
  styleUrls: ['./button-monochrome.component.scss'],
})
export class ButtonMonochromeComponent implements OnInit {
  @Input() text: string = 'view';
  constructor() {}

  ngOnInit(): void {}
}
