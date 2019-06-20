import { Career } from "./career";

export class Student {
  _id: string;
  names: string;
  lastnames: string;
  career: Career;
  cedula: string;
  numero_unico: string;
  email: string;
  phone: string;

  constructor() {
    this._id = null;
    this.names = "";
    this.lastnames = "";
  }
}
