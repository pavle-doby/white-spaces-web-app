export class BusyFlag {
  public id: number;
  public flag: boolean;

  constructor(obj: BusyFlag) {
    this.id = obj.id;
    this.flag = obj.flag;
  }
}
