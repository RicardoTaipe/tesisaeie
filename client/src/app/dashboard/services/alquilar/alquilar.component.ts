import { Component, OnInit, ViewChild } from "@angular/core";
import { LockerService } from "src/app/services/locker.service";
import {
  MatPaginator,
  MatTabGroup,
  MatTableDataSource,
  MatHorizontalStepper,
  MatSnackBar
} from "@angular/material";
import { Locker } from "src/app/model/locker";
import { Student } from "src/app/model/students";
import { StudentService } from "src/app/services/student.service";

@Component({
  selector: "app-alquilar",
  templateUrl: "./alquilar.component.html",
  styleUrls: ["./alquilar.component.css"]
})
export class AlquilarComponent implements OnInit {
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("stepper") stepper: MatHorizontalStepper;

  locker: Locker = new Locker();
  displayedColumns: string[] = ["description", "state", "Seleccionar"];
  displayedColumnsAlquiler: string[] = [
    "casillero",
    "estado",
    "nombres",
    "apellidos",
    "notificar",
    "terminar"
  ];
  displayedColumnsStudent: string[] = ["names", "lastnames", "Seleccionar"];
  dataSource = new MatTableDataSource<Locker>();
  dataSourceStudent = new MatTableDataSource<Student>();
  dataSourceAlquiler = new MatTableDataSource<Locker>();

  constructor(
    private lockerService: LockerService,
    private studentService: StudentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getLockers();
    this.getStudents();
    this.getLockersNotFree();
    this.locker.student = new Student();
  }
  applyFilter(filterValue: string) {
    this.dataSourceStudent.filter = filterValue.trim().toLowerCase();
  }

  getLockers() {
    this.lockerService.getFreeLockers().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }

  getLockersNotFree() {
    this.lockerService.getLockers().subscribe(res => {
      this.dataSourceAlquiler.data = res.filter(locker => locker.state == true);
      this.dataSourceAlquiler.paginator = this.paginator;
    });
  }
  getStudents() {
    this.studentService.getStudents().subscribe(
      res => {
        this.dataSourceStudent.data = res;
        this.dataSourceStudent.paginator = this.paginator;
      },
      err => {}
    );
  }

  resetStepper() {
    this.stepper.reset();
    this.stepper.steps.first.select();
    this.locker.student = new Student();
    this.locker.state = false;
  }

  selectLocker(lockerSelected: Locker) {
    this.locker = lockerSelected;
    this.stepper.next();
  }

  selectStudent(studentSelected: Student) {
    if (this.locker._id == null) {
      this.showMessage({ message: "Debe seleccionar un casillero primero" });
      this.stepper.previous();
    } else {
      this.locker.state = true;
      this.locker.student = studentSelected;
      this.stepper.next();
    }
  }

  guardarAlquiler() {
    console.log(this.locker);
    if (this.locker._id == null) {
      this.showMessage({
        message: "Debe seleccionar un casillero previamente"
      });
      this.stepper.steps.first.select();
    } else {
      this.lockerService.alquilarLocker(this.locker).subscribe(
        res => {
          this.showMessage(res);
          this.getLockers();
          this.getLockersNotFree();
          this.resetStepper();
        },
        err => {}
      );
    }
  }

  notificar(locker:Locker){
    console.log(locker)
    this.lockerService.notify(locker).subscribe(res=>{
      this.showMessage(res);
    });
    
  }

  terminarAlquiler(lockerSelected: Locker) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.lockerService.terminarAlquiler(lockerSelected).subscribe(res => {
        this.showMessage(res);
        this.getLockers();
        this.getLockersNotFree();
      });
    }
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
