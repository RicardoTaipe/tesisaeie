import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTabGroup,
  MatPaginator,
  MatTableDataSource,
  MatSnackBar,
  MatSelect,
  MatOption
} from "@angular/material";
import { Product } from "src/app/model/products";
import { ProductService } from "src/app/services/product.service";
import { NgForm } from "@angular/forms";
import { Category } from "src/app/model/category";
import { Supplier } from "src/app/model/supplier";
import { CategoryService } from "src/app/services/category.service";
import { SupplierService } from "src/app/services/supplier.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @ViewChild("supplier") selectSupplier: MatSelect;
  @ViewChild("category") selectCategory: MatSelect;
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly PRODUCT_REGISTERED = 0;
  readonly REGISTRAR_PRODUCT = 1;
  product: Product = new Product();
  categories: Category[];
  suppliers: Supplier[];
  displayedColumns: string[] = [
    "name",
    "description",
    "price",
    "stock",
    "category",
    "supplier",
    "update",
    "delete"
  ];
  dataSource = new MatTableDataSource<Product>();
  option: MatOption;
  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getSuppliers();
  }

  saveProduct(productForm: NgForm) {
    if (productForm.form.valid) {
      if (productForm.value._id == null) {
        this.productService.addProduct(productForm.value).subscribe(data => {
          this.getProducts();
          this.showMessage(data);
          this.resetForm(productForm);
          this.tabGroup.selectedIndex = this.PRODUCT_REGISTERED;
        });
      } else {
        this.productService
          .updateProduct(productForm.value._id, productForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getProducts();
            this.resetForm(productForm);
            this.tabGroup.selectedIndex = this.PRODUCT_REGISTERED;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.PRODUCT_REGISTERED;
    });
  }

  updateProduct(productSelected: Product) {
    this.product = Object.assign({}, productSelected);

    this.tabGroup.selectedIndex = this.REGISTRAR_PRODUCT;
    //this.select.value = productSelected.supplier;
    setTimeout(() => {
      this.selectSupplier.options
        .find(e => e.value._id === productSelected.supplier._id)
        .select();
      this.selectCategory.options
        .find(e => e.value._id === productSelected.category._id)
        .select();
    }, 500);
  }

  deleteProduct(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.productService.deleteProduct(_id).subscribe(res => {
        this.showMessage(res);
        this.getProducts();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.product = new Product();
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      error => {}
    );
  }
  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      res => {
        this.suppliers = res;
      },
      error => {}
    );
  }
}
