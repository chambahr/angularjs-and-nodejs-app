import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: any;

  // product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) { }


  productId: string = '';
  product: Product | undefined;


  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getProduct(id);
    });
  }

 

  getProduct(id: string) {
    this.productService.getProduct(id).subscribe(
      (product: Product) => {
        this.product = product;
        console.log(this.product);
      },
      error => {
        console.log('Error occurred:', error);
      }
    );
  }

 

  viewProduct(id: number): void {
    this.router.navigate(['/products/find/', id]);
  }
}
