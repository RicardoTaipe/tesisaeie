import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { HttpClient } from "@angular/common/http";
import { Student } from "../model/students";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  private URL_API = URL_SERVER + "/student";

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<Student[]>(this.URL_API);
  }

  addStudent(student: Student) {
    return this.http.post(this.URL_API, student);
  }

  updateStudent(_id: string, student: Student) {
    return this.http.put(this.URL_API + "/" + _id, student);
  }

  deleteStudent(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }
}
