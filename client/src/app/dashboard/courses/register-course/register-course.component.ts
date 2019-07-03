import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatHorizontalStepper,
  MatPaginator,
  MatTabGroup,
  MatTableDataSource,
  MatSnackBar
} from "@angular/material";
import { Course } from "src/app/model/course";
import { Student } from "src/app/model/students";
import { StudentService } from "src/app/services/student.service";
import { CourseService } from "src/app/services/course.service";

@Component({
  selector: "app-register-course",
  templateUrl: "./register-course.component.html",
  styleUrls: ["./register-course.component.css"]
})
export class RegisterCourseComponent implements OnInit {
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("student") paginatorStudent: MatPaginator;
  @ViewChild("stepper") stepper: MatHorizontalStepper;

  course: Course = new Course();
  student: Student = new Student();
  displayedColumns: string[] = ["name", "places", "seleccionar"];
  displayedColumnsAlquiler: string[] = [
    "casillero",
    "estado",
    "nombres",
    "apellidos",
    "notificar",
    "terminar"
  ];
  displayedColumnsStudent: string[] = ["names", "lastnames", "Seleccionar"];
  dataSource = new MatTableDataSource<Course>();
  dataSourceStudent = new MatTableDataSource<Student>();
  dataSourceAlquiler = new MatTableDataSource<Course>();

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCourses();
    this.getStudents();
    //this.getLockersNotFree();
  }

  applyFilter(filterValue: string) {
    this.dataSourceStudent.filter = filterValue.trim().toLowerCase();
  }

  getCourses() {
    this.courseService.getCourses().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }

  getStudents() {
    this.studentService.getStudents().subscribe(
      res => {
        this.dataSourceStudent.data = res;
        this.dataSourceStudent.paginator = this.paginatorStudent;
      },
      err => {}
    );
  }

  resetStepper() {
    this.stepper.reset();
    this.stepper.steps.first.select();
    this.course = new Course();
    this.student = new Student();
  }

  selectCourse(courseSelected: Course) {
    this.course = courseSelected;
    this.stepper.next();
  }

  selectStudent(studentSelected: Student) {
    if (this.course._id == null) {
      this.showMessage({ message: "Debe seleccionar un curso primero" });
      this.stepper.previous();
    } else {
      //this.locker.student = studentSelected;
      this.student = studentSelected;
      this.stepper.next();
    }
  }

  guardarRegistro() {
    console.log(this.course);
    if (this.course._id == null) {
      this.showMessage({
        message: "Debe seleccionar un casillero previamente"
      });
      this.stepper.steps.first.select();
    } else {
      if (this.searchStudent(this.student) !== -1) {
        this.showMessage({
          message: "El estudiante ya esta registrado"
        });
        this.resetStepper();
        return;
      }
      this.course.students.push(this.student);
      console.log(this.course);
      this.courseService.updateCourse(this.course._id,this.course).subscribe(
        res => {
          this.showMessage(res);
          this.getCourses();
          this.resetStepper();
        },
        err => {}
      );
    }
  }

  searchStudent(student: Student) {
    return this.course.students.findIndex((e: Student) => e == student);
  }
  // terminarAlquiler(lockerSelected: Locker) {
  //   if (confirm("Esta seguro de eliminar este item?")) {
  //     this.courseService.terminarAlquiler(lockerSelected).subscribe(res => {
  //       this.showMessage(res);
  //       this.getCourses();
  //     });
  //   }
  // }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
