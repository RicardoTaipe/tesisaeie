import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/model/products";
import { Sale } from "src/app/model/sale";
import { SaleService } from "src/app/services/sale.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-sale",
  templateUrl: "./sale.component.html",
  styleUrls: ["./sale.component.css"]
})
export class SaleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    "Nombre",
    "Precio",
    "Cantidad",
    "Subtotal",
    //"Actualizar",
    "Eliminar"
  ];
  dataSource = new MatTableDataSource<any>();

  productSelected = new Product();
  products: Product[];
  productsFiltered: Product[];
  sale = {
    productName: "",
    product: "",
    cantidad: 0,
    precio: 0,
    products: []
  };
  total: any = 0;
  saleFinal: Sale = new Sale();

  constructor(
    private productService: ProductService,
    private saleService: SaleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getProducts();
    this.dataSource.data = this.sale.products;
    this.dataSource.paginator = this.paginator;
  }

  process(event: any) {
    this.productSelected = event.option.value;
    this.sale.productName = this.productSelected.name;
    this.sale.precio = this.productSelected.price;
    this.sale.product = this.productSelected._id;
  }

  agregar() {
    if (this.productSelected.stock < this.sale.cantidad) {
      this.showMessage("No hay suficientes productos para la venta");
      return;
    }
    if (this.productSelected._id == null) {
      this.showMessage("Seleccione un producto");
      return;
    }
    if (this.sale.cantidad < 1) {
      this.showMessage("Ingrese una cantidad");
      return;
    }

    let productExists = this.sale.products.findIndex(
      e => e.product == this.productSelected._id
    );

    if (productExists != -1) {
      this.sale.products[productExists] = {
        product: this.sale.product,
        productName: this.sale.productName,
        quantity:
          Number(this.sale.products[productExists].quantity) +
          Number(this.sale.cantidad),
        price: Number(this.sale.precio),
        subtotal: (
          (Number(this.sale.products[productExists].quantity) +
            Number(this.sale.cantidad)) *
          Number(this.sale.precio)
        ).toFixed(2)
      };
      this.updateStock();
      this.dataSource.data = this.sale.products;
    } else {
      this.sale.products.push({
        product: this.sale.product,
        productName: this.sale.productName,
        quantity: Number(this.sale.cantidad),
        price: Number(this.sale.precio),
        subtotal: Number(this.sale.cantidad * this.sale.precio).toFixed(2)
      });
      this.updateStock();
      this.dataSource.data = this.sale.products;
    }
    this.getTotalCost();
  }

  updateStock() {
    this.products.map(product => {
      if (product._id == this.productSelected._id) {
        product.stock = product.stock - this.sale.cantidad;
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res;
        this.productsFiltered = this.products;
      },
      error => {}
    );
  }

  getTotalCost() {
    this.total = 0;
    this.sale.products.map(product => {
      this.total =
        Number(this.total) + Number(product.price * product.quantity);
    });
    return this.total;
  }

  displayFn(product?: Product) {
    return product ? product.name : undefined;
  }

  searchProduct(event: any) {
    console.log(event.target.value);
    return (this.productsFiltered = this.products.filter(
      product => product.name.toLowerCase().includes(event.target.value)
      //product.name.toLowerCase().indexOf(event.target.value) !==- 1
    ));
  }
  /*
  updateProduct(product) {
    console.log(product);
  }*/

  deleteProduct(product) {
    for (var i = 0; i < this.sale.products.length; i++) {
      if (this.sale.products[i].product === product.product) {
        this.sale.products.splice(i, 1);
      }
    }
    this.products.map(element => {
      if (element._id == product.product) {
        element.stock = Number(element.stock) + Number(product.quantity);
      }
    });
    this.getTotalCost();
    this.dataSource.data = this.sale.products;
  }

  saveSale() {
    if (this.sale.products.length == 0) {
      return this.showMessage("Ingrese algun producto");
    }
    this.saleFinal.user = localStorage.getItem("uid");
    this.saleFinal.date = new Date().toString();
    this.saleFinal.total_value = this.total;
    this.saleFinal.products = this.sale.products;
    this.saleService.addSale(this.saleFinal).subscribe(
      res => {
        //reset
        this.total = 0;
        this.sale.products = [];
        this.dataSource.data = this.sale.products;

        this.showMessage(res.message);
        this.getProducts();
      },
      error => {}
    );
  }

  showMessage(data) {
    this.snackBar.open(data, "OK", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
