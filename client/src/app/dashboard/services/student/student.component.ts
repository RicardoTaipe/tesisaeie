import { Component, OnInit, ViewChild} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatTabGroup,
  MatTableDataSource,
  MatOption,
  MatSnackBar,
  MatSelect,
} from "@angular/material";
import { Student } from "src/app/model/students";
import { NgForm } from "@angular/forms";
import { StudentService } from "src/app/services/student.service";
import { CareerService } from "src/app/services/career.service";
import { Career } from "src/app/model/career";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  @ViewChild("career") selectCareer: MatSelect;
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly STUDENT_REGISTERED = 0;
  readonly REGISTER_STUDENT = 1;
  student: Student = new Student();
  careers: Career[];
  displayedColumns: string[] = [
    "names",
    "lastnames",
    "career",
    "cedula",
    "numero_unico",
    "email",
    "phone",
    "update",
    "delete"
  ];
  dataSource = new MatTableDataSource<Student>();
  option: MatOption;
  constructor(
    private snackBar: MatSnackBar,
    private studentService: StudentService,
    private careerService: CareerService,
  ) {}

  ngOnInit() {
    this.getStudents();
    this.getCareers();
  }

  saveStudent(studentForm: NgForm) {
    console.log(studentForm.value);
    if (studentForm.form.valid) {
      if (studentForm.value._id == null) {
        this.studentService.addStudent(studentForm.value).subscribe(data => {
          this.getStudents();
          this.showMessage(data);
          this.resetForm(studentForm);
          this.tabGroup.selectedIndex = this.STUDENT_REGISTERED;
        });
      } else {
        this.studentService
          .updateStudent(studentForm.value._id, studentForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getStudents();
            this.resetForm(studentForm);
            this.tabGroup.selectedIndex = this.STUDENT_REGISTERED;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStudents() {
    this.studentService.getStudents().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.STUDENT_REGISTERED;
    });
  }

  updateStudent(studentSelected: Student) {
    this.student = Object.assign({}, studentSelected);

    this.tabGroup.selectedIndex = this.REGISTER_STUDENT;
    //this.select.value = studentSelected.supplier;
    setTimeout(() => {
      this.selectCareer.options
        .find(e => e.value._id === studentSelected.career._id)
        .select();
    }, 500);
  }

  deleteStudent(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.studentService.deleteStudent(_id).subscribe(res => {
        this.showMessage(res);
        this.getStudents();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.student = new Student();
    this.tabGroup.selectedIndex = this.STUDENT_REGISTERED;
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  getCareers() {
    this.careerService.getCareers().subscribe(
      res => {
        this.careers = res;
        console.log(res);
      },
      error => {}
    );
  }
}
