import { SectionRanges } from './SectionRanges.model';

export class SectionNavBtn {
  public section: string;
  public label: string;
  public sectionRanges: SectionRanges;

  public isSelected?: boolean = false;
  public isCompleted?: boolean = false;

  constructor(obj: SectionNavBtn) {
    this.section = obj.section;
    this.label = obj.label;
    this.sectionRanges = obj.sectionRanges;
    
    this.isSelected = !!obj.isSelected;
    this.isCompleted = !!obj.isCompleted;
  }
}
