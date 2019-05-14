import { Component, OnInit } from "@angular/core";
import { User } from "../model/user";

import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
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
        localStorage.setItem("uid", res.uid);
        localStorage.setItem("token", res.token);
        this.router.navigate(["/dashboard"]);
      },
      error => {
        this.showMessage(error.error.message);
        
      }
    );
  }

  showMessage(message:string){
    this.snackBar.open(message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
