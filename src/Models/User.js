export default class User {
  constructor(name, surname, patronomic, password_hash) {
    this.name = name;
    this.surname = surname;
    this.patronomic = patronomic;
    this.password_hash = password_hash;
  }
}
