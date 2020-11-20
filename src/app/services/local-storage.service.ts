import { Injectable } from '@angular/core';
import { Question } from 'src/models/Question.model';
import { AddOn } from 'src/models/AddOn';
import { AppUser } from 'src/models/User.model';

export const BEARER = ' Bearer ';

export enum LocalStorageKey {
  PACKAGE_CATEGORY_ID = 'PACKAGE_CATEGORY_ID',
  ADDON_CATEGORY_ID = 'ADDON_CATEGORY_ID',
  ADD_ON_LIST = 'add-ons',
  QUESTIONS = 'questions',
  USER = 'user',
  AUTH_TOKEN = 'auth-token',
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

  public get Questions(): Question[] {
    return JSON.parse(
      this.storage.getItem(LocalStorageKey.QUESTIONS)
    ) as Question[];
  }

  public set Questions(questions: Question[]) {
    this.storage.setItem(LocalStorageKey.QUESTIONS, JSON.stringify(questions));
  }

  public appendQuestions(
    questions: Question[],
    toFront: boolean = false
  ): void {
    const oldQuestions = this.Questions ?? [];
    const newQuestions = toFront
      ? [...questions, ...oldQuestions]
      : [...oldQuestions, ...questions];
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
