



export default class ReasercherModel {
  constructor({
    id,
    email,
    password_hash,
    role,
    name,
    surname,
    patronomic,
    job_id,
    phone,
  }) {
    this.id = id;
    this.email = email;
    this.password_hash = password_hash;
    this.role = role;
    this.name = name;
    this.surname = surname;
    this.patronomic = patronomic;
    this.job_id = job_id;
    this.phone = phone;
  }
}
