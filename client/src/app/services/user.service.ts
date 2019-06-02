import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private URL_API = URL_SERVER + "/user";

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.URL_API);
  }

  addUser(user: User) {
    return this.http.post(this.URL_API, user);
  }

  updateUser(_id: string, user: User) {
    return this.http.put(this.URL_API + "/" + _id, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }
}
