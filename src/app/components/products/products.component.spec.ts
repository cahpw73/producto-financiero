import { ProductsComponent } from './products.component';
import { Product } from '../../models/product.model';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let productServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    productServiceMock = {
      getAllProducts: jest.fn().mockReturnValue(of([])),
      deleteProduct: jest.fn()
    };
    routerMock = {
      navigate: jest.fn()
    };
    component = new ProductsComponent(productServiceMock, routerMock);
  });

  it('should call loadProducts on initialization', () => {
    const loadProductsSpy = jest.spyOn(component, 'loadProducts');
    component.ngOnInit();

    expect(loadProductsSpy).toHaveBeenCalled();
  });

  it('should load products successfully', () => {
    const mockProducts: Product[] = [
      { 
        id: '1', 
        name: 'Product 1',
        description: 'Product 1',
        logo: 'logo1',
        date_release: new Date(),
        date_revision: new Date()
      }, 
      { 
        id: '2', 
        name: 'Product 2',
        description: 'Product 2',
        logo: 'logo2',
        date_release: new Date(),
        date_revision: new Date()
      }
    ];
    productServiceMock.getAllProducts.mockReturnValue(of(mockProducts));

    component.loadProducts();

    expect(component.products).toEqual(mockProducts);
    expect(component.quantityProducts).toEqual(mockProducts.length);
    expect(component.isLoading).toBeFalsy();
  });

  it('should update filtered products when search term is provided', () => {
    const searchTerm = 'product 1';
    component.products = [
      { 
        id: '1', 
        name: 'Product 1',
        description: 'Product 1',
        logo: 'logo1',
        date_release: new Date(),
        date_revision: new Date() 
      }, 
      { 
        id: '2', 
        name: 'Product 2',
        description: 'Product 2',
        logo: 'logo2',
        date_release: new Date(),
        date_revision: new Date()
      }
    ];

    component.onSearchChange(searchTerm);

    expect(component.filteredProducts.length).toEqual(1);
    expect(component.filteredProducts[0].name).toEqual('Product 1');
    expect(component.quantityProducts).toEqual(1);
  });

  it('should update filtered products when search term is empty', () => {
    component.products = [
      { 
        id: '1', 
        name: 'Product 1',
        description: 'Product 1',
        logo: 'logo1',
        date_release: new Date(),
        date_revision: new Date() 
      }, 
      { 
        id: '2', 
        name: 'Product 2',
        description: 'Product 2',
        logo: 'logo2',
        date_release: new Date(),
        date_revision: new Date()
      }
    ];

    component.onSearchChange('');

    expect(component.filteredProducts.length).toEqual(2);
    expect(component.quantityProducts).toEqual(2);
  });

  it('should navigate to edit product form', () => {
    const mockProduct: Product = { 
      id: '1', 
      name: 'Product 1',
      description: 'Product 1',
      logo: 'logo1',
      date_release: new Date(),
      date_revision: new Date() 
    };
    const mockEvent: MouseEvent = new MouseEvent('click');

    component.editProduct(mockProduct, mockEvent);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products/form', JSON.stringify(mockProduct)]);
  });

  it('should show delete modal', () => {
    const mockProduct: Product = { 
      id: '1', 
      name: 'Product 1',
      description: 'Product 1',
      logo: 'logo1',
      date_release: new Date(),
      date_revision: new Date() 
    };

    component.showDeleteModal(mockProduct);

    expect(component.productNameToDelete).toEqual(mockProduct.name);
    expect(component.showDeleteModalFlag).toBeTruthy();
    expect(component.productSelected).toEqual(mockProduct);
  });
});
