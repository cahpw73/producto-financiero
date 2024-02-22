import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from './product-form.component';
import { of } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let productServiceMock: Partial<ProductService>;
  let routerMock: any;
  let routeMock: any;

  beforeEach(() => {
    // Configurar los mocks necesarios
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
        get: jest.fn().mockReturnValue('your-value')
      })
    };

    // Crear una instancia de ProductFormComponent con los mocks
    component = new ProductFormComponent(
      productServiceMock as any,
      routerMock as any,
      routeMock as any
    );
  });

  it('should update product and navigate when onSubmit is called while editing', () => {
    // Simular modo de edición
    component.isEditing = true;
    // Simular llamada a onSubmit
    component.onSubmit();
    // Verificar que productService.updateProduct y router.navigate hayan sido llamados
    expect(productServiceMock.updateProduct).toHaveBeenCalledWith(component.product);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should create product and navigate when onSubmit is called while not editing', () => {
    // Simular llamada a onSubmit
    component.onSubmit();
    // Verificar que productService.checkProductId y productService.createProduct hayan sido llamados
    expect(productServiceMock.checkProductId).toHaveBeenCalledWith(component.product.id);
    expect(productServiceMock.createProduct).toHaveBeenCalledWith(component.product);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  // it('should update product date_revision when onReleaseDateChange is called', () => {
  //   // Simular llamada a onReleaseDateChange
  //   component.product.date_release = new Date('2024-02-21T00:00:00.000Z');
  //   component.onReleaseDateChange();
  //   // Verificar que product.date_revision haya sido actualizado correctamente
  //   expect(component.product.date_revision).toEqual(new Date('2024-02-21T00:00:00.000Z'));
  // });

  it('should return current date in ISO format when getCurrentDate is called', () => {
    // Simular llamada a getCurrentDate
    const currentDate = component.getCurrentDate();
    // Verificar que la fecha devuelta sea la fecha actual en formato ISO
    expect(currentDate).toEqual(new Date().toISOString().split('T')[0]);
  });
});
