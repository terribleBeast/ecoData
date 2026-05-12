export interface IResearcherData {
  id: number;
  email: string;
  password_hash: string;
  role: string;
  name: string;
  surname: string;
  patronymic: string;
  job: string;
  phone: string;
  researches_id: number[];
}
