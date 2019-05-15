import { Injectable } from '@angular/core';
import { URL_SERVER } from './url';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  
  private URL_API = URL_SERVER+"/supplier";

  constructor(private http: HttpClient) { }

  getSuppliers(){
    return this.http.get<Supplier[]>(this.URL_API);
  }

  addSupplier(supplier:Supplier){
    return this.http.post(this.URL_API,supplier);
  }

  updateSupplier(_id:string,supplier:Supplier){
    return this.http.put(this.URL_API+"/"+_id,supplier);
  }

  deleteSupplier(_id:string){
    return this.http.delete(this.URL_API+"/"+_id);
  }
}
