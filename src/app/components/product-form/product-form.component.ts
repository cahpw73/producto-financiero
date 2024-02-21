import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  product: Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date,
    date_revision: new Date
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  onSubmit() {
    const authorId: number = 123;
    this.productService.createProduct(this.product, authorId).subscribe(
      (response) => {
        console.log('Producto creado:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(' Error al crear el producto:', error);
      }
    )
  }
}
