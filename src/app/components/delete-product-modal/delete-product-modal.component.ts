import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrl: './delete-product-modal.component.css'
})
export class DeleteProductModalComponent {

  @Input() productName: string | undefined;
  @Output() cancelClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  cancel(): void {
    this.cancelClicked.emit();
  }

  delete(): void {
    this.deleteClicked.emit();
  }
}
