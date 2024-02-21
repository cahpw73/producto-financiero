import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error ocurred:', error);
    return throwError(() => new Error('Something went wrong'));
  }
  
  getAllProducts(authorId: number): Observable<Product[]> {
    const headers = new HttpHeaders().set('authorId', authorId.toString());
    return this.http.get<Product[]>(this.baseUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createProduct(product: Product, authorId: number): Observable<Product> {
    const headers = new HttpHeaders().set('authorId', authorId.toString());
    return this.http.post<Product>(this.baseUrl, product, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product, authorId: number): Observable<Product> {
    const headers = new HttpHeaders().set('authorId', authorId.toString());
    return this.http.put<Product>(this.baseUrl, product, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(productId: string, authorId: number): Observable<void> {
    const headers = new HttpHeaders().set('authorId', authorId.toString());
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete<void>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  checkProductId(productId: string): Observable<boolean> {
    const url = `${this.baseUrl}/verification?id=${productId}`;
    return this.http.get<boolean>(url).pipe(
      catchError(this.handleError)
    );
  }
}
