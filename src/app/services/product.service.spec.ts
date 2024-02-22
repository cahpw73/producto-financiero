import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';



describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: { get: jest.Mock };

  beforeEach(() => {
    httpClientSpy = { get: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });

    service = TestBed.inject(ProductService);
  });

  it('should return an array of products', () => {
    const expectedProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: new Date(), date_revision: new Date() }
    ];

    httpClientSpy.get.mockImplementation(() => of(expectedProducts));

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(expectedProducts);
    });
  });

  it('should handle errors gracefully', () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };

    httpClientSpy.get.mockImplementation(() => throwError(errorResponse));

    service.getAllProducts().subscribe(
      () => fail('expected an error, but got success'),
      error => {
        expect(error).toEqual(errorResponse);
      }
    );
  });
});