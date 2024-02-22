import '@angular/compiler';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { FormsModule } from '@angular/forms';
import { ProductPaginationComponent } from './components/product-pagination/product-pagination.component';
import { LogoContainerComponent } from './components/logo-container/logo-container.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductSearchComponent,
    ProductPaginationComponent,
    LogoContainerComponent,
    DeleteProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
