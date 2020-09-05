import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public goHome(): void {
    this.router.navigateByUrl(`/${MainRouterPaths.HOME}`);
  }
}
