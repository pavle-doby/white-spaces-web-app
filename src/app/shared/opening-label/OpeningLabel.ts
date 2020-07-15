export class OpeningLabel {
  constructor(
    public label: string,
    public description: string,
    public isOpen: boolean = false
  ) {}

  public static produce(obj: OpeningLabel): OpeningLabel {
    return new OpeningLabel(obj.label, obj.description, obj.isOpen);
  }
}
