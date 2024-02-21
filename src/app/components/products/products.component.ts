import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = false;
  quantityProducts: number = 0;
  productsPerPage: number = 5;
  currentPage: number = 1;
  private authorId: number = 123;
  showDeleteModalFlag = false;
  productNameToDelete: string | undefined;

  productSelected: Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date()
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts(this.authorId).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.updateFilteredProducts();
        this.quantityProducts = this.filteredProducts.length;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading products: ', error);
        this.isLoading = false;
      }
    );
  }

  onSearchChange(searchTerm: string): void {
    this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.quantityProducts = this.filteredProducts.length;
  }

  onProductsPerPageChange(productsPerPage: number): void {
    this.productsPerPage = productsPerPage;
    this.currentPage = 1;
    this.updateFilteredProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateFilteredProducts();
  }

  editProduct(product: Product, event: Event): void {
    event.preventDefault();
    const data = JSON.stringify(product);
    this.router.navigate(['/products/form', data])
  }

  private updateFilteredProducts(): void {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.filteredProducts = this.products.slice(startIndex, endIndex);
  }

  // Método para mostrar el modal y guardar el nombre del producto
  showDeleteModal(product: Product): void {
    this.productNameToDelete = product.name;
    this.showDeleteModalFlag = true;
    this.productSelected = product;
  }

  // Método para ocultar el modal
  hideDeleteModal(): void {
    this.showDeleteModalFlag = false;
  }

  // Método para eliminar el producto
  deleteProduct(): void {
    // Llamar al servicio para eliminar el producto
    this.productService.deleteProduct(this.productSelected.id, this.authorId).subscribe(() => {
      this.showDeleteModalFlag = false;
      this.loadProducts();
    });
  }
}
