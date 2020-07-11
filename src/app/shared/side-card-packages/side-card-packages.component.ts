import { Component, OnInit } from '@angular/core';
import { PACKAGES } from './side-card-packages.content';
import { SideCadrPackage } from './SideCardPackage';

@Component({
  selector: 'app-side-card-packages',
  templateUrl: './side-card-packages.component.html',
  styleUrls: ['./side-card-packages.component.scss'],
})
export class SideCardPackagesComponent implements OnInit {
  public readonly packages: SideCadrPackage[] = PACKAGES;

  constructor() {}

  ngOnInit(): void {}
}
