export class ContactDTO {
  public name: string;
  public message: string;
  public city: string;
  public mail: string;
  public phone: string;

  constructor(obj: ContactDTO) {
    this.name = obj.name;
    this.message = obj.message;
    this.city = obj.city;
    this.mail = obj.mail;
    this.phone = obj.phone;
  }
}
