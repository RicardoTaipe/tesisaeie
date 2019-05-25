import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { User } from '../model/user';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUsername();    
  }

  getUsername(){
    this.auth.getUserName().subscribe(res => {
      this.user = res as User
    }, error => {
      console.log(error)
    });
  }
}
