import { Injectable } from '@angular/core';
import { FloorPlan } from 'src/models/FloorPlan.model';
import { ShoppingCart } from 'src/models/ShopingCart.model';
import { Question } from 'src/models/Question.model';
import { AddOn } from 'src/models/AddOn';

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

  private constructor() {}

  public static get Instance(): LocalStorageService {
    return this._instance ?? (this._instance = new LocalStorageService());
  }

  public set SpacePhotosUrls(spacePhotosUrls: string[]) {
    this.storage.setItem(
      LocalStorageKey.SPACE_PHOTOS_URLS,
      JSON.stringify(spacePhotosUrls)
    );
  }

  public get SpacePhotosUrls(): string[] {
    return JSON.parse(this.storage.getItem(LocalStorageKey.SPACE_PHOTOS_URLS));
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
    const newQuestions = [...oldQuestions, ...questions];
    this.storage.setItem(
      LocalStorageKey.QUESTIONS,
      JSON.stringify(newQuestions)
    );
    console.log('LS:', this.Questions);
  }

  public set AddOnList(addOnList: AddOn[]) {
    this.storage.setItem(
      LocalStorageKey.ADD_ON_LIST,
      JSON.stringify(addOnList)
    );
  }

  public get AddOnList(): AddOn[] {
    return JSON.parse(this.storage.getItem(LocalStorageKey.ADD_ON_LIST));
  }

  public chageAddOnState(addOn: AddOn, isSelected: boolean): void {
    this.AddOnList = this.AddOnList.map((ao) => {
      return ao.id === addOn.id ? { ...addOn, isSelected: isSelected } : ao;
    });
  }
}
