import { Student } from "./students";
import { Semester } from './semester';

export class Aporte {
  _id: string;
  valor: number;
  description: string;
  date: Date;
  semester: Semester;
  student: Student;
}
