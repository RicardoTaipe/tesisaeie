import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../model/user";
import { URL_SERVER } from "./url";
import { Observable, of } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private URL_API = URL_SERVER + "/user";
  private isLoggedIn = false;

  constructor(private http: HttpClient, private _router: Router) {}

  getUserName() {
    const idUser = localStorage.getItem("uid");
    return this.http.get(this.URL_API + "/" + idUser);
  }

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
