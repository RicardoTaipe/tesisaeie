import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTabGroup,
  MatPaginator,
  MatTableDataSource,
  MatSnackBar
} from "@angular/material";
import { Supplier } from "src/app/model/supplier";
import { SupplierService } from "src/app/services/supplier.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.css"]
})
export class SupplierComponent implements OnInit {
  @ViewChild("tabs") tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly SUPPLIER_REGISTERED = 0;
  readonly REGISTRAR_SUPPLIER = 1;
  supplier: Supplier = new Supplier();
  displayedColumns: string[] = ["name", "phone", "update", "delete"];
  dataSource = new MatTableDataSource<Supplier>();

  constructor(
    private supplierService: SupplierService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getSuppliers();
  }

  saveSupplier(supplierForm: NgForm) {
    if (supplierForm.form.valid) {
      if (supplierForm.value._id == null) {
        this.supplierService.addSupplier(supplierForm.value).subscribe(data => {
          this.getSuppliers();
          this.showMessage(data);
          this.resetForm(supplierForm);
          this.tabGroup.selectedIndex = this.SUPPLIER_REGISTERED;
        });
      } else {
        this.supplierService
          .updateSupplier(supplierForm.value._id, supplierForm.value)
          .subscribe(data => {
            this.showMessage(data);
            this.getSuppliers();
            this.resetForm(supplierForm);
            this.tabGroup.selectedIndex = this.SUPPLIER_REGISTERED;
          });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.tabGroup.selectedIndex = this.SUPPLIER_REGISTERED;
    });
  }

  updateSupplier(supplierSelected: Supplier) {
    this.supplier = Object.assign({}, supplierSelected);
    this.tabGroup.selectedIndex = this.REGISTRAR_SUPPLIER;
  }
  deleteSupplier(_id: string) {
    if (confirm("Esta seguro de eliminar este item?")) {
      this.supplierService.deleteSupplier(_id).subscribe(res => {
        this.showMessage(res);
        this.getSuppliers();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.supplier = new Supplier();
  }

  showMessage(data) {
    this.snackBar.open(data.message, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
