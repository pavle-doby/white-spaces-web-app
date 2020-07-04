import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isPackagesSelected: boolean = false;
  public isFQASelected: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public onPackagesClick(): void {
    this.isPackagesSelected = !this.isPackagesSelected;
    this.isFQASelected = false;
  }

  public onFQASClick(): void {
    this.isFQASelected = !this.isFQASelected;
    this.isPackagesSelected = false;
  }
}
