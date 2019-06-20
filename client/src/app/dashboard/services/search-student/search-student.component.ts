import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatSelect,
  MatPaginator,
  MatTabGroup,
  MatTableDataSource,
  MatOption,
  MatSnackBar,
  MatDialogRef
} from "@angular/material";
import { Student } from "src/app/model/students";
import { Career } from "src/app/model/career";
import { StudentService } from "src/app/services/student.service";
import { CareerService } from "src/app/services/career.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search-student",
  templateUrl: "./search-student.component.html",
  styleUrls: ["./search-student.component.css"]
})
export class SearchStudentComponent implements OnInit {
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
    "select"
  ];
  dataSource = new MatTableDataSource<Student>();
  option: MatOption;
  constructor(
    private snackBar: MatSnackBar,
    private studentService: StudentService,
    private careerService: CareerService,
    public dialogRef: MatDialogRef<SearchStudentComponent>
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

  selectStudent(studentSelected: Student) {
    this.dialogRef.close(studentSelected);
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
