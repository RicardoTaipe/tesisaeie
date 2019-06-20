import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { HttpClient } from "@angular/common/http";
import { Semester } from "../model/semester";

@Injectable({
  providedIn: "root"
})
export class SemesterService {
  private URL_API = URL_SERVER + "/semester";

  constructor(private http: HttpClient) {}

  getSemesters() {
    return this.http.get<Semester[]>(this.URL_API);
  }

  addSemester(semester: Semester) {
    return this.http.post(this.URL_API, semester);
  }

  updateSemester(_id: string, semester: Semester) {
    return this.http.put(this.URL_API + "/" + _id, semester);
  }

  deleteSemester(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }
}
