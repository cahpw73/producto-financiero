import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from './product-form.component';
import { of } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let productServiceMock: Partial<ProductService>;
  let routerMock: any;
  let routeMock: any;

  beforeEach(() => {
    productServiceMock = {
      updateProduct: jest.fn().mockReturnValue(of({})),
      checkProductId: jest.fn().mockReturnValue(of(false)),
      createProduct: jest.fn().mockReturnValue(of({}))
    };

    routerMock = {
      navigate: jest.fn()
    };

    routeMock = {
      paramMap: of({
        get: jest.fn().mockReturnValue(JSON.stringify({
          id: '1',
          name: 'Test Product',
          description: 'Test Description',
          logo: 'test.png',
          date_release: new Date(),
          date_revision: new Date()
        }))
      })
    };

    component = new ProductFormComponent(
      productServiceMock as any,
      routerMock as any,
      routeMock as any
    );
  });

  it('should update product and navigate when onSubmit is called while editing', () => {
    component.isEditing = true;
    component.onSubmit();

    expect(productServiceMock.updateProduct).toHaveBeenCalledWith(component.product);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should create product and navigate when onSubmit is called while not editing', () => {
    component.onSubmit();

    expect(productServiceMock.checkProductId).toHaveBeenCalledWith(component.product.id);
    expect(productServiceMock.createProduct).toHaveBeenCalledWith(component.product);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return current date in ISO format when getCurrentDate is called', () => {
    const currentDate = component.getCurrentDate();

    expect(currentDate).toEqual(new Date().toISOString().split('T')[0]);
  });

  it('should set product when data is provided in paramMap', () => {
    component.ngOnInit();

    expect(component.isEditing).toBe(true);
    expect(component.product.id).toBe('1');
    expect(component.product.name).toBe('Test Product');
  });

  it('should not set product when no data is provided in paramMap', () => {
    routeMock.paramMap = of({
      get: jest.fn().mockReturnValue(null)
    });

    component.ngOnInit();

    expect(component.isEditing).toBe(false);
    expect(component.product.id).toBeFalsy();
  });
});
