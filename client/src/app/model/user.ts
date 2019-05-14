import { Role } from "./role";

export class User {
  _id: string;
  names: string;
  lastnames: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  roles: Role[];
}
