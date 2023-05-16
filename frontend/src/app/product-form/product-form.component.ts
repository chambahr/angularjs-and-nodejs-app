import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  private url = 'http://localhost:9090/api/products/create/';

  productForm: FormGroup;

  product: any;
  selectedImage: File | null = null;

  name: string = '';
  price: string = '';
  description: string = '';
  // imageUrl: {}

  isNewProduct: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      (response) => {
        this.product = response;
        console.log(this.product);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleImageUpload(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImage = files[0];
    }
  }
  

  onSubmit() {
    let product = {
      name: this.name,
      price: this.price,
      description: this.description,
      imageUrl: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1565295718-41-Z274tCDL.jpg?crop=1xw:1xh;center,top&resize=980:*'
      
    };

    if (!this.name) {
      alert('Name is required');
      return
    }
    
    if (!this.price) {
      alert('Price is required');
      return
    }
    
    if (!this.description) {
      alert('Description is required');
      return
    }


    if (this.selectedImage) {
      imageUrl: this.selectedImage, this.selectedImage.name
    }

    console.log(product);

    this.http.post(this.url, product)
      .subscribe(
        (res) => {

          // alert user on success
          alert('product created with success')
          console.log(res);

          // reset the form input values
          this.name = '';
          this.price = '';
          this.description = '';
        },
        (err) => {
          console.log('Error occurred:', err);
        }
      );
  }
}
