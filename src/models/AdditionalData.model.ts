import { PackageType } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { QuestionDTO } from './QuestionDTO.model';

export interface AdditionalData {
  questions?: Record<string, QuestionDTO[]>;
  type?: PackageType | string; // For Package
  floor_plan?: string[]; // For Package
  images?: string[]; // For Package
}

export interface AdditionalDataLineItem {
  questions?: QuestionDTO[];
  type?: string; // For Package
  floor_plan?: string[]; // For Package
  //BE needs to be updated, or maybe not :D
  floor_plan_name?: string; // For Package
  images?: string[]; // For Package
}
