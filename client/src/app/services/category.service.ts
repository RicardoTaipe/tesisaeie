import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {URL_SERVER} from "./url";
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private URL_API = URL_SERVER+"/category";

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(this.URL_API);
  }

  addCategory(category:Category){
    return this.http.post(this.URL_API,category);
  }

  updateCategory(_id:string,category:Category){
    return this.http.put(this.URL_API+"/"+_id,category);
  }

  deleteCategory(_id:string){
    return this.http.delete(this.URL_API+"/"+_id);
  }
}
