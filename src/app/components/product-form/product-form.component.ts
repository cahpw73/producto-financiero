import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { calculateRevisionDate, formatDate, formatDateString } from '../../Utils/date-util';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date()
  };

  isEditing: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const data = params.get('data');
      if (data) {
        const parsedData = JSON.parse(data);

        parsedData.date_release = new Date(parsedData.date_release);
        parsedData.date_revision = new Date(parsedData.date_revision);

        parsedData.date_release = formatDateString(parsedData.date_release.toUTCString());
        parsedData.date_revision = formatDateString(parsedData.date_revision.toUTCString());

        this.product = parsedData;

        this.isEditing = true;
      }
    });
  }

  onSubmit() {
    if (this.isEditing) {
      console.log("Updating Product");
      this.productService.updateProduct(this.product).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(' Error al editar el producto:', error);
        }
      )
    } else {
      console.log("Creating Product");
      this.productService.checkProductId(this.product.id).subscribe(
        (exists) => {
          if (exists) {
            console.warn('El ID ya está en uso. Por favor, elija otro.');
          } else {
            this.productService.createProduct(this.product).subscribe(
              (response) => {
                console.log('Producto creado:', response);
                this.router.navigate(['/']);
              },
              (error) => {
                console.error(' Error al crear el producto:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error al verificar el ID del producto:', error);
        }
      );
    }
  }

  onReleaseDateChange(): void {
    this.product.date_revision = calculateRevisionDate(this.product.date_release);

    const data = JSON.stringify(this.product);
    const parsedData = JSON.parse(data);
    parsedData.date_revision = formatDateString(parsedData.date_revision);

    this.product = parsedData;
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const utcOffset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() - utcOffset);
    return currentDate.toISOString().split('T')[0];
  }
}
