import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTabGroup,
  MatPaginator,
  MatTableDataSource,
  MatSnackBar
} from "@angular/material";
import { Semester } from "src/app/model/semester";
import { SemesterService } from "src/app/services/semester.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-semester",
  templateUrl: "./semester.component.html",
  styleUrls: ["./semester.component.css"]
})
export class SemesterComponent implements OnInit {
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly SEMESTRES_REGISTRADOS = 0;
  readonly REGISTRAR_SEMESTRE = 1;
  semester: Semester = new Semester();
  displayedColumns: string[] = ["Nombre", "Actualizar", "Eliminar"];
  dataSource = new MatTableDataSource<Semester>();

  constructor(
    private semesterService: SemesterService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getSemesters();
  }

  saveSemester(semesterForm: NgForm) {
    if (semesterForm.form.valid) {
      if (semesterForm.value._id == null) {
        this.semesterService.addSemester(semesterForm.value).subscribe(data => {
          this.getSemesters();
          this.showMessage(data);
          this.resetForm(semesterForm);
          this.tabGroup.selectedIndex = this.SEMESTRES_REGISTRADOS;
        });
      } else {
        this.semesterService
          .updateSemester(semesterForm.value._id, semesterForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getSemesters();
            this.resetForm(semesterForm);
            this.tabGroup.selectedIndex = this.SEMESTRES_REGISTRADOS;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSemesters() {
    this.semesterService.getSemesters().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.SEMESTRES_REGISTRADOS;
    });
  }

  updateSemester(semesterSelected: Semester) {
    this.semester = Object.assign({}, semesterSelected);
    this.tabGroup.selectedIndex = this.REGISTRAR_SEMESTRE;
  }

  deleteSemester(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.semesterService.deleteSemester(_id).subscribe(res => {
        this.showMessage(res);
        this.getSemesters();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.semester = new Semester();
    this.tabGroup.selectedIndex = this.SEMESTRES_REGISTRADOS;
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
