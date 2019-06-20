import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { HttpClient } from "@angular/common/http";
import { Career } from "../model/career";

@Injectable({
  providedIn: "root"
})
export class CareerService {
  private URL_API = URL_SERVER + "/career";

  constructor(private http: HttpClient) {}

  getCareers() {
    return this.http.get<Career[]>(this.URL_API);
  }

  addCareer(career: Career) {
    return this.http.post(this.URL_API, career);
  }

  updateCareer(_id: string, career: Career) {
    return this.http.put(this.URL_API + "/" + _id, career);
  }

  deleteCareer(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }
}
