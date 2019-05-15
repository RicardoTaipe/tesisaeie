import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { Product } from "../model/products";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private URL_API = URL_SERVER + "/product";

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.URL_API);
  }

  addProduct(product: Product) {
    return this.http.post(this.URL_API, product);
  }

  updateProduct(_id: string, product: Product) {
    return this.http.put(this.URL_API + "/" + _id, product);
  }

  deleteProduct(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }
}
