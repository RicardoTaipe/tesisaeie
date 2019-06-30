import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { HttpClient } from "@angular/common/http";
import { Locker } from "../model/locker";

@Injectable({
  providedIn: "root"
})
export class LockerService {
  private URL_API = URL_SERVER + "/locker";

  constructor(private http: HttpClient) {}

  getLockers() {
    return this.http.get<Locker[]>(this.URL_API);
  }
  getFreeLockers() {
    return this.http.get<Locker[]>(this.URL_API + "/?state=false");
  }

  addLocker(locker: Locker) {
    return this.http.post(this.URL_API, locker);
  }

  updateLocker(_id: string, locker: Locker) {
    return this.http.put(this.URL_API + "/" + _id, locker);
  }

  deleteLocker(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }

  alquilarLocker(locker: Locker) {
    return this.http.put(
      this.URL_API + `/${locker._id}/student/${locker.student._id}`,
      locker
    );
  }

  terminarAlquiler(locker: Locker) {
    return this.http.delete(
      this.URL_API + `/${locker._id}/student/${locker.student._id}`
    );
  }

  notify(locker:Locker){
    const body={email:locker.student.email ,casillero:locker.description};

    return this.http.post(this.URL_API+"/notify",body)
  }
}
