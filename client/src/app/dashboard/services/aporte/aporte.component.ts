import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatSelect,
  MatTabGroup,
  MatPaginator,
  MatTableDataSource,
  MatOption,
  MatSnackBar,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { Aporte } from "src/app/model/aporte";
import { Semester } from "src/app/model/semester";
import { AporteService } from "src/app/services/aporte.service";
import { SemesterService } from "src/app/services/semester.service";
import { NgForm } from "@angular/forms";
import { StudentComponent } from "../student/student.component";
import { SearchStudentComponent } from "../search-student/search-student.component";
import { Student } from "src/app/model/students";

@Component({
  selector: "app-aporte",
  templateUrl: "./aporte.component.html",
  styleUrls: ["./aporte.component.css"]
})
export class AporteComponent implements OnInit {
  @ViewChild("semester") selectSemester: MatSelect;
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly APORTE_REGISTERED = 0;
  readonly REGISTRAR_APORTE = 1;
  aporte: Aporte = new Aporte();
  semesters: Semester[];
  displayedColumns: string[] = [
    "name",
    "lastname",
    "semester",
    "date",
    "valor",
    "description",
    "update",
    "delete"
  ];
  dataSource = new MatTableDataSource<Aporte>();
  option: MatOption;
  student: Student = new Student();
  showFullName = "No name";
  constructor(
    private aporteService: AporteService,
    private snackBar: MatSnackBar,
    private semesterService: SemesterService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAportes();
    this.getSemesters();
    this.aporte.student = new Student();
  }

  saveAporte(aporteForm: NgForm) {
    console.log(aporteForm.value);
    if (aporteForm.form.valid) {
      if (aporteForm.value._id == null) {
        this.aporteService.addAporte(aporteForm.value).subscribe(data => {
          this.getAportes();
          this.showMessage(data);
          this.resetForm(aporteForm);
          this.tabGroup.selectedIndex = this.APORTE_REGISTERED;
        });
      } else {
        this.aporteService
          .updateAporte(aporteForm.value._id, aporteForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getAportes();
            this.resetForm(aporteForm);
            this.tabGroup.selectedIndex = this.APORTE_REGISTERED;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAportes() {
    this.aporteService.getAportes().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.APORTE_REGISTERED;
    });
  }

  updateProduct(aporteSelected: Aporte) {
    this.aporte = Object.assign({}, aporteSelected);

    this.tabGroup.selectedIndex = this.REGISTRAR_APORTE;
    //this.select.value = aporteSelected.supplier;
    setTimeout(() => {
      this.selectSemester.options
        .find(e => e.value._id === aporteSelected.semester._id)
        .select();
    }, 500);
  }

  deleteProduct(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.aporteService.deleteAporte(_id).subscribe(res => {
        this.showMessage(res);
        this.getAportes();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.aporte = new Aporte();
    this.aporte.student = new Student();
    this.tabGroup.selectedIndex = this.APORTE_REGISTERED;
    this.showFullName = " ";
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

  openDialog() {
    const dialogRef = this.dialog.open(SearchStudentComponent);
    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result !== undefined) {
        this.aporte.student = result;
        this.showFullName = result.names + " " + result.lastnames;
        this.aporte.date = new Date();
      }
    });
  }
}
