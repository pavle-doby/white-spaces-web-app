import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-packages',
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.scss'],
})
export class AdminPackagesComponent implements OnInit {
  public packages = [];
  public questionnaireRooms: string[] = [];
  public addOns = [];
  public form: FormGroup = new FormGroup({
    smallName: new FormControl(''),
    smallPrice: new FormControl(''),
    smallDescription: new FormControl(''),
    mediumName: new FormControl(''),
    mediumPrice: new FormControl(''),
    mediumDescription: new FormControl(''),
    largeName: new FormControl(''),
    largePrice: new FormControl(''),
    largeDescription: new FormControl(''),
  });

  constructor(private adminService: AdminService) {
    this.adminService.getAllPackages().subscribe((res) => {
      this.packages = res;
      this.questionnaireRooms = Object.getOwnPropertyNames(
        this.packages[0].additional_data.questions
      );
      this.form.setValue({
        smallName: res[0].name,
        smallPrice: res[0].price,
        smallDescription: res[0].data.description,
        mediumName: res[1].name,
        mediumPrice: res[1].price,
        mediumDescription: res[1].data.description,
        largeName: res[2].name,
        largePrice: res[2].price,
        largeDescription: res[2].data.description,
      });
    });
    this.adminService.getAllAddons().subscribe((res) => {
      this.addOns = res;
    });
  }

  ngOnInit(): void {}
}
