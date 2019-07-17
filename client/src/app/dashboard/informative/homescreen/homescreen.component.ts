import { Component, OnInit } from "@angular/core";
import { AporteService } from "src/app/services/aporte.service";
import { UserService } from "src/app/services/user.service";
import { SaleService } from 'src/app/services/sale.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: "app-homescreen",
  templateUrl: "./homescreen.component.html",
  styleUrls: ["./homescreen.component.css"]
})
export class HomescreenComponent implements OnInit {
  aportes;
  usuarios;
  ventas;
  productos;
  constructor(
    private aportesService: AporteService,
    private userService: UserService,
    private ventasService: SaleService,
    private productosService: ProductService
  ) {}

  ngOnInit() {
    this.aportesService.getAportes().subscribe(res=>{
      this.aportes = res.length;
    })
    this.userService.getUsers().subscribe(res=>{
      this.usuarios = res.length;
    })
    this.ventasService.getSales().subscribe(res=>{
      this.ventas = res.length;
    })
    this.productosService.getProducts().subscribe(res=>{
      this.productos = res.length;
    })
    
  }
}
