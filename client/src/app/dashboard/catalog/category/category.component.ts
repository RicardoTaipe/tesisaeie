import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTabGroup,
  MatPaginator,
  MatTableDataSource,
  MatSnackBar
} from "@angular/material";
import { NgForm } from "@angular/forms";
import { Category } from "src/app/model/category";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly CATEGORIAS_REGISTRADAS = 0;
  readonly REGISTRAR_CATEGORIA = 1;
  category: Category = new Category();
  displayedColumns: string[] = ["name", "description", "update", "delete"];
  dataSource = new MatTableDataSource<Category>();

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  saveCategory(categoryForm: NgForm) {
    if (categoryForm.form.valid) {
      if (categoryForm.value._id == null) {
        this.categoryService.addCategory(categoryForm.value).subscribe(data => {
          this.getCategories();
          this.showMessage(data);
          this.resetForm(categoryForm);
          this.tabGroup.selectedIndex = this.CATEGORIAS_REGISTRADAS;
        });
      } else {
        this.categoryService
          .updateCategory(categoryForm.value._id, categoryForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getCategories();
            this.resetForm(categoryForm);
            this.tabGroup.selectedIndex = this.CATEGORIAS_REGISTRADAS;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.CATEGORIAS_REGISTRADAS;
    });
  }

  updateCategory(categorySelected: Category) {
    this.category = Object.assign({}, categorySelected);
    this.tabGroup.selectedIndex = this.REGISTRAR_CATEGORIA;
  }
  deleteCategory(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.categoryService.deleteCategory(_id).subscribe(res => {
        this.showMessage(res);
        this.getCategories();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.category = new Category();
    //console.log(this.category)
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
