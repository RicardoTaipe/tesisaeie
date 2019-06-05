import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Sale } from "src/app/model/sale";
import { SaleService } from "src/app/services/sale.service";

@Component({
  selector: "app-list-sale",
  templateUrl: "./list-sale.component.html",
  styleUrls: ["./list-sale.component.css"]
})
export class ListSaleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ["user", "date", "products", "total"];
  dataSource = new MatTableDataSource<Sale>();

  constructor(private saleService: SaleService) {}

  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.saleService.getSales().subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }
}
