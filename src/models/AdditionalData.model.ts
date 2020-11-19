import { QuestionDTO } from './QuestionDTO.model';

export interface AdditionalData {
  questions?: Record<string, QuestionDTO[]>;
  type?: string; // For Package
  floor_plan?: string; // For Package
  images?: string[]; // For Package
}

export interface AdditionalDataLineItem {
  questions?: QuestionDTO[];
  type?: string; // For Package
  floor_plan?: string; // For Package
  images?: string[]; // For Package
}
