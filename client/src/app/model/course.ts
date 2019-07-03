import { Semester } from "./semester";
import { Student } from "./students";

export class Course {
  _id: string;
  name: string;
  description: string;
  //content: string;
  price: number;
  date: Date;
  places: number;
  semester: Semester;
  students: Student[];
}
