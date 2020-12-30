import { Question } from './Question.model';

export class SectionRanges {
  public section: string;
  public rangeStart: number;
  public rangeEnd?: number;
  public labelMap: Record<number, number>;

  constructor(obj: SectionRanges) {
    this.section = obj.section;
    this.rangeStart = obj.rangeStart;
    this.rangeEnd = obj.rangeEnd;
    this.labelMap = obj.labelMap;
  }

  public static makeDictSectionRanges(
    questions: Question[]
  ): Record<string, SectionRanges> {
    let dictSectionRanges: Record<string, SectionRanges> = {};
    let sectionRanges: SectionRanges;
    let q: Question;
    let label;

    for (let i = 0; i < questions.length; i++) {
      q = questions[i];
      sectionRanges = dictSectionRanges[q.section];

      if (sectionRanges) {
        dictSectionRanges[q.section].rangeEnd = i;
        label = Object.values(sectionRanges.labelMap).length + 1;
        dictSectionRanges[q.section].labelMap[q.id] = label;
      } else {
        dictSectionRanges[q.section] = new SectionRanges({
          section: q.section,
          rangeStart: i,
          rangeEnd: i,
          labelMap: { [q.id]: 1 },
        });
      }
    }

    return dictSectionRanges;
  }
}
