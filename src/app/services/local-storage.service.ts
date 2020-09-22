import { Injectable } from '@angular/core';
import { FloorPlan } from 'src/models/FloorPlan.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { Question } from 'src/models/Question.model';
import { AddOn } from 'src/models/AddOn';
import { AppUser } from 'src/models/User.model';
import { PackagesBox } from '../shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';

export enum LocalStorageKey {
  PACKAGE = 'package',
  PACKAGE_CATEGORY_ID = 'PACKAGE_CATEGORY_ID',
  ADDON_CATEGORY_ID = 'ADDON_CATEGORY_ID',
  FLOOR_PLAN = 'floor-plan-link',
  SPACE_PHOTOS_URLS = 'space-photos-urls',
  ADD_ON_LIST = 'add-ons',
  QUESTIONS = 'questions',
  SHOPPING_CART = 'shopping-cart',
  USER = 'user',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private static _instance: LocalStorageService;

  public storage: Storage = localStorage;

  private constructor() {}

  public clearCheckoutState(): void {
    this.AddOnList = [];
    this.FloorPlan = null;
    this.Package = null;
    this.Questions = [];
    this.ShoppingCart = null;
    this.SpacePhotosUrls = [];
  }

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

  public get User(): AppUser {
    return JSON.parse(this.storage.getItem(LocalStorageKey.USER));
  }

  public set User(user: AppUser) {
    this.storage.setItem(LocalStorageKey.USER, JSON.stringify(user));
  }

  public get Package(): PackagesBox {
    return JSON.parse(this.storage.getItem(LocalStorageKey.PACKAGE));
  }

  public set Package(packageBox: PackagesBox) {
    this.storage.setItem(LocalStorageKey.PACKAGE, JSON.stringify(packageBox));
  }

  public get PackageCategroyId(): number {
    return JSON.parse(
      this.storage.getItem(LocalStorageKey.PACKAGE_CATEGORY_ID)
    );
  }

  public set PackageCategroyId(category_id: number) {
    this.storage.setItem(
      LocalStorageKey.PACKAGE_CATEGORY_ID,
      JSON.stringify(category_id)
    );
  }

  public get AddOnCategroyId(): number {
    return JSON.parse(this.storage.getItem(LocalStorageKey.ADDON_CATEGORY_ID));
  }

  public set AddOnCategroyId(category_id: number) {
    this.storage.setItem(
      LocalStorageKey.ADDON_CATEGORY_ID,
      JSON.stringify(category_id)
    );
  }
}
