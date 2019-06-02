import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  MatPaginator,
  MatTabGroup,
  MatTableDataSource,
  MatOption,
  MatSnackBar,
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from "@angular/material";
import { User } from "src/app/model/user";
import { Role } from "src/app/model/role";
import { UserService } from "src/app/services/user.service";
import { NgForm } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  readonly USER_REGISTERED = 0;
  readonly REGISTER_USER = 1;
  user: User = new User();

  displayedColumns: string[] = [
    "names",
    "lastnames",
    "username",
    "email",
    "phone",
    "admin",
    "update",
    "delete"
  ];
  dataSource = new MatTableDataSource<User>();
  option: MatOption;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  saveUser(userForm: NgForm) {
    console.log(userForm.value);
    if (userForm.form.valid) {
      if (userForm.value._id == null) {
        this.userService.addUser(userForm.value).subscribe(data => {
          this.getUsers();
          this.showMessage(data);
          this.resetForm(userForm);
          this.tabGroup.selectedIndex = this.USER_REGISTERED;
        });
      } else {
        this.userService
          .updateUser(userForm.value._id, userForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getUsers();
            this.resetForm(userForm);
            this.tabGroup.selectedIndex = this.USER_REGISTERED;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.USER_REGISTERED;
    });
  }

  updateUser(userSelected: User) {
    console.log(userSelected);
    this.user = Object.assign({}, userSelected);
    this.tabGroup.selectedIndex = this.REGISTER_USER;
  }

  deleteUser(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.userService.deleteUser(_id).subscribe(res => {
        this.showMessage(res);
        this.getUsers();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.user = new User();
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
