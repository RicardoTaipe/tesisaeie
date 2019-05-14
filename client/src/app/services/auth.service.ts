import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private URL_API = "http://localhost:3000/api/user";

  constructor(private http: HttpClient, private _router: Router) {}

  loginUser(user: User) {
    return this.http.post<any>(this.URL_API + "/login", user);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    this._router.navigate(["/login"]);
  }
}
