import { Student } from "./students";

export class Locker {
  _id: string;
  description: string;
  state: boolean;
  valor: number;
  student: Student;
  constructor() {
    this._id = null;
  }
}
