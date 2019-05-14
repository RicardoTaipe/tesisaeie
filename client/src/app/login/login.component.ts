import { Component, OnInit } from "@angular/core";
import { User } from "../model/user";

import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Form } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginUserData = new User();

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  loginUser() {
    this.auth.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("uid", res.uid);
        localStorage.setItem("token", res.token);
        this.router.navigate(["/dashboard"]);
      },
      error => {
        console.log(error);
        this.snackBar.open(error.error.message, "OK", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center"
        });
      }
    );
  }
}
