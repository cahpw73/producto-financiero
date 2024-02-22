import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-pagination',
  templateUrl: './product-pagination.component.html',
  styleUrl: './product-pagination.component.css'
})
export class ProductPaginationComponent {

  @Input() totalProducts: number = 0;
  @Input() productsPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Output() productsPerPageChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  onProductsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value) {
      this.productsPerPageChange.emit(+value);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.productsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
