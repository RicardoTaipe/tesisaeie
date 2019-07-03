import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatSelect,
  MatTabGroup,
  MatPaginator,
  MatTableDataSource,
  MatOption,
  MatSnackBar
} from "@angular/material";
import { Semester } from "src/app/model/semester";
import { Course } from "src/app/model/course";
import { CourseService } from "src/app/services/course.service";
import { SemesterService } from "src/app/services/semester.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"]
})
export class CourseComponent implements OnInit {
  // @ViewChild("supplier") selectSupplier: MatSelect;
  @ViewChild("semester") selectSemester: MatSelect;
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly COURSE_REGISTERED = 0;
  readonly REGISTRAR_COURSE = 1;
  course: Course = new Course();
  semesters: Semester[];
  //suppliers: Supplier[];
  displayedColumns: string[] = [
    "name",
    "description",
    "price",
    "places",
    "date",
    "semester",
    "update",
    "delete"
  ];
  dataSource = new MatTableDataSource<Course>();
  option: MatOption;
  minDate = new Date();

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private semesterService: SemesterService //private supplierService: SupplierService
  ) {}

  ngOnInit() {
    this.getCourses();
    this.getSemesters();
    //this.getSuppliers();
  }

  saveCourse(courseForm: NgForm) {
    console.log(courseForm.value);
    if (courseForm.form.valid) {
      if (courseForm.value._id == null) {
        this.courseService.addCourse(courseForm.value).subscribe(data => {
          this.getCourses();
          this.showMessage(data);
          this.resetForm(courseForm);
          this.tabGroup.selectedIndex = this.COURSE_REGISTERED;
        });
      } else {
        this.courseService
          .updateCourse(courseForm.value._id, courseForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getCourses();
            this.resetForm(courseForm);
            this.tabGroup.selectedIndex = this.COURSE_REGISTERED;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCourses() {
    this.courseService.getCourses().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.COURSE_REGISTERED;
    });
  }

  updateCourse(courseSelected: Course) {
    this.course = Object.assign({}, courseSelected);

    this.tabGroup.selectedIndex = this.REGISTRAR_COURSE;
    //this.select.value = courseSelected.supplier;
    setTimeout(() => {
      // this.selectSupplier.options
      //   .find(e => e.value._id === courseSelected.supplier._id)
      //   .select();
      this.selectSemester.options
        .find(e => e.value._id === courseSelected.semester._id)
        .select();
    }, 500);
  }

  deleteCourse(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.courseService.deleteCourse(_id).subscribe(res => {
        this.showMessage(res);
        this.getCourses();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.course = new Course();
    this.tabGroup.selectedIndex = this.COURSE_REGISTERED;
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  getSemesters() {
    this.semesterService.getSemesters().subscribe(
      res => {
        this.semesters = res;
      },
      error => {}
    );
  }
  // getSuppliers() {
  //   this.supplierService.getSuppliers().subscribe(
  //     res => {
  //       this.suppliers = res;
  //     },
  //     error => {}
  //   );
  // }
}
