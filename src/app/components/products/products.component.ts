import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;

    const authorId: number = 123;

    this.productService.getAllProducts(authorId).subscribe(
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

  private updateFilteredProducts(): void {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.filteredProducts = this.products.slice(startIndex, endIndex);
  }
}
