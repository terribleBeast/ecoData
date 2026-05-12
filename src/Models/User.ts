export interface IUserData {
  name?: string;
  surname?: string;
  patronymic?: string;
  password_hash?: string;
  email: string;
  id?: number;
}

export class User implements IUserData {
  name?: string;
  surname?: string;
  patronymic?: string;
  password_hash?: string;
  email: string;
  id?: number;

  constructor(data: IUserData) {
    this.email = data.email;
  }
}
