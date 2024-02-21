import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'products/form', component: ProductFormComponent},
  {path: 'products/form/:data', component: ProductFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
