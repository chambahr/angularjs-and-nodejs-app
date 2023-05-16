import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product | undefined;
  productId: string = '';

  name: string = '';
  price: string = '';
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

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
        // console.log(this.product);
      },
      error => {
        console.log('Error occurred:', error);
      }
    );
  }

  onSubmit() {

    if (!this.product || !this.product._id) {
      console.log('Invalid product');
      alert('invalid product')
      return;
    }
    
    const updatedProduct: Product = {
      _id: this.product._id,
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      imageUrl: this.product.imageUrl
    };

    // console.log(updatedProduct);
    

    this.productService.updateProduct(updatedProduct).subscribe(
      response => {
        console.log('Product updated successfully');
        alert('Product updated successfully')

        if (!this.product || !this.product._id) {
          // console.log('Invalid product');
          alert('Invalid product')
          return;
        }
        this.router.navigate(['/products', this.product._id]);
      },
      error => {
        console.log('Error updating product:', error);
        if (error.status === 401) {
          alert('you are not authorised to update products. Only authenticated users can update products')
        }else if(error.status === 500){
          alert("we currently have issues with your servers, kindly reach out to support")
        }
        
      }
    );
  }
}
