export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * VM - View Model, somthing that FE sends to BE
 */
export class UserVM {
  public first_name: string;
  public last_name: string;
  public email: string;
  public password?: string;
  public country: string;
  public city: string;
  public phone_number: string;
  public address: string;

  constructor(obj: UserVM) {
    return obj;
  }
}

/**
 * AppUser - User that is retured by BE, and we use it in app
 */
export class AppUser extends UserVM {
  public id?: number;
  public verified: boolean;
  public role: UserRole;

  constructor(obj: AppUser) {
    super({
      first_name: obj.first_name,
      last_name: obj.last_name,
      email: obj.email,
      password: obj.password,
      country: obj.country,
      city: obj.city,
      phone_number: obj.phone_number,
      address: obj.address,
    });
    this.id = obj.id;
    this.verified = obj.verified;
    this.role = obj.role;
  }
}
