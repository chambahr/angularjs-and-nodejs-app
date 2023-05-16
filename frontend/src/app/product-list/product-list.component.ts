import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any;
  

  constructor(
        private productService: ProductService, 
        private router: Router,
        private http: HttpClient  
      ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  // fetch all products
  fetchProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // delete products
  deleteProduct(data: any) {
    this.productService.deleteData(data._id)
      .subscribe(response => {
          console.log(response);
          alert(response.message)
          // Refresh the product list
          this.fetchProducts(); 
        },
        (error) => {
          console.log(error.statusText);
          if (error.status === 401) {
            alert('only authenticated users can delete products')  
          } else if(error.status === 400){
            alert('we currently have issues with our servers')
          }
        }
      )
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
