import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {

  @Output() searchChange = new EventEmitter<string>();
  searchTerm: string = '';

  constructor() { }

  performSearch(): void {
    this.searchChange.emit(this.searchTerm);
  }

}
