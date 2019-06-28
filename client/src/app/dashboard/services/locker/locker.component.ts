import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import {
  MatPaginator,
  MatTableDataSource,
  MatSnackBar
} from "@angular/material";
import { Locker } from "src/app/model/locker";
import { LockerService } from "src/app/services/locker.service";
import { NgForm } from "@angular/forms";
import { Student } from "src/app/model/students";

@Component({
  selector: "app-locker",
  templateUrl: "./locker.component.html",
  styleUrls: ["./locker.component.css"]
})
export class LockerComponent implements OnInit {
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly LOCKERS_REGISTRADOS = 0;
  readonly REGISTRAR_LOCKER = 1;
  locker: Locker = new Locker();
  displayedColumns: string[] = [
    "description",
    "state",
    "Actualizar",
    "Eliminar"
  ];
  dataSource = new MatTableDataSource<Locker>();

  constructor(
    private lockerService: LockerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getLockers();
    this.locker.student = new Student();
  }

  saveLocker(lockerForm: NgForm) {
    if (lockerForm.form.valid) {
      if (lockerForm.value._id == null) {
        this.lockerService.addLocker(lockerForm.value).subscribe(data => {
          this.getLockers();
          this.showMessage(data);
          this.resetForm(lockerForm);
          this.tabGroup.selectedIndex = this.LOCKERS_REGISTRADOS;
        });
      } else {
        this.lockerService
          .updateLocker(lockerForm.value._id, lockerForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getLockers();
            this.resetForm(lockerForm);
            this.tabGroup.selectedIndex = this.LOCKERS_REGISTRADOS;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLockers() {
    this.lockerService.getLockers().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.LOCKERS_REGISTRADOS;
    });
  }

  updateLocker(lockerSelected: Locker) {
    this.locker = Object.assign({}, lockerSelected);
    this.tabGroup.selectedIndex = this.REGISTRAR_LOCKER;
  }

  deleteLocker(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.lockerService.deleteLocker(_id).subscribe(res => {
        this.showMessage(res);
        this.getLockers();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.locker = new Locker();
    this.locker.student = new Student();
    this.tabGroup.selectedIndex = this.LOCKERS_REGISTRADOS;
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
