import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { HttpClient } from "@angular/common/http";
import { Course } from "../model/course";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  private URL_API = URL_SERVER + "/course";

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<Course[]>(this.URL_API);
  }

  addCourse(course: Course) {
    return this.http.post(this.URL_API, course);
  }

  updateCourse(_id: string, course: Course) {
    return this.http.put(this.URL_API + "/" + _id, course);
  }

  deleteCourse(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }
}
