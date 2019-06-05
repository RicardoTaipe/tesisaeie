import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { HttpClient } from "@angular/common/http";
import { Sale } from "../model/sale";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class SaleService {
  private URL_API = URL_SERVER + "/sale";

  constructor(private http: HttpClient) {}

  getSales() {
    return this.http.get<Sale[]>(this.URL_API);
  }

  addSale(sale: Sale): Observable<any> {
    return this.http.post(this.URL_API, sale);
  }
}
