import { Category } from "./category";
import { Supplier } from "./supplier";

export class Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  supplier: Supplier;

  constructor() {
    this._id = null;
  }
}
