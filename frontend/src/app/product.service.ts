import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private url = "http://localhost:9090/api/products/"

  constructor(private http: HttpClient) { }

  ProductArray : any[] = [];

  // list all products
  getProducts() {
    return this.http.get(this.url)
  }

  // get product by id
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}find/${id}`);
  }

  // delete product
  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.url}/find/${id}`)
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}create`, formData);
  }

  updateProduct(product: Product): Observable<Product> {
    const updateUrl = `${this.url}find/${product._id}`;
    return this.http.put<Product>(updateUrl, product);
  }
  
}
