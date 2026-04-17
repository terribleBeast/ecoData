export default class ReasercherModel {
  constructor({
    id,
    email,
    password_hash,
    role,
    name,
    surname,
    patronomic,
    job,
    phone,
    reaserches_id,
  }) {
    this.id = id;
    this.email = email;
    this.password_hash = password_hash;
    this.role = role;
    this.name = name;
    this.surname = surname;
    this.patronomic = patronomic;
    this.job = job;
    this.phone = phone;
    this.reaserches_id = reaserches_id;
  }
}
