import { Injectable } from '@angular/core';
import { FloorPlan } from 'src/models/FloorPlan.model';
import { ShoppingCart } from 'src/models/ShopingCart.model';
import { PackagesBox } from '../shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { Question } from 'src/models/Question.model';

interface FileUrlObj {
  url: string[];
}

export enum LocalStorageKey {
  PACKAGE = 'package',
  FLOOR_PLAN = 'floor-plan-link',
  SPACE_PHOTOS_URLS = 'space-photos-urls',
  ADD_ON_LIST = 'add-ons',
  QUESTIONS = 'questions',
  SHOPPING_CART = 'shopping-cart',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private static _instance: LocalStorageService;

  public storage: Storage = localStorage;

  private spacePhotsUrlsObj: FileUrlObj;

  private constructor() {}

  public static get Instance(): LocalStorageService {
    return this._instance ?? (this._instance = new LocalStorageService());
  }

  public set SpacePhotosUrls(spacePhotosUrls: string[]) {
    this.spacePhotsUrlsObj = {
      url: spacePhotosUrls,
    };

    this.storage.setItem(
      LocalStorageKey.SPACE_PHOTOS_URLS,
      JSON.stringify(this.spacePhotsUrlsObj)
    );
  }

  public get SpacePhotosUrls(): string[] {
    this.spacePhotsUrlsObj = JSON.parse(
      this.storage.getItem(LocalStorageKey.SPACE_PHOTOS_URLS)
    );

    return this.spacePhotsUrlsObj.url;
  }

  public set FloorPlan(floorPlan: FloorPlan) {
    this.storage.setItem(LocalStorageKey.FLOOR_PLAN, JSON.stringify(floorPlan));
  }

  public get FloorPlan(): FloorPlan {
    const obj = JSON.parse(this.storage.getItem(LocalStorageKey.FLOOR_PLAN));
    return obj ? new FloorPlan(obj) : null;
  }

  public set ShoppingCart(obj: ShoppingCart) {
    this.storage.setItem(LocalStorageKey.SHOPPING_CART, JSON.stringify(obj));
  }

  public get ShoppingCart(): ShoppingCart {
    return JSON.parse(
      this.storage.getItem(LocalStorageKey.SHOPPING_CART)
    ) as ShoppingCart;
  }

  public get Questions(): Question[] {
    return JSON.parse(
      this.storage.getItem(LocalStorageKey.QUESTIONS)
    ) as Question[];
  }

  public set Questions(questions: Question[]) {
    this.storage.setItem(LocalStorageKey.QUESTIONS, JSON.stringify(questions));
  }

  public appendQuestions(questions: Question[]): void {
    const oldQuestions = this.Questions ?? [];
    const newQuestions = [...oldQuestions, questions];
    this.storage.setItem(
      LocalStorageKey.QUESTIONS,
      JSON.stringify(newQuestions)
    );
    console.log('LS:', this.Questions);
  }
}
