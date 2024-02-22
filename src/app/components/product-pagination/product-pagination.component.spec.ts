import { ProductPaginationComponent } from './product-pagination.component';

describe('ProductPaginationComponent', () => {
  let component: ProductPaginationComponent;

  beforeEach(() => {
    component = new ProductPaginationComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit page change event when onPageChange is called', () => {
    const mockPage = 2;
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.onPageChange(mockPage);
    expect(emitSpy).toHaveBeenCalledWith(mockPage);
  });

  it('should emit products per page change event when onProductsPerPageChange is called', () => {
    const mockEvent = { target: { value: '10' } } as any;
    const emitSpy = jest.spyOn(component.productsPerPageChange, 'emit');
    component.onProductsPerPageChange(mockEvent);
    expect(emitSpy).toHaveBeenCalledWith(10);
  });

  it('should calculate total pages correctly', () => {
    component.totalProducts = 25;
    component.productsPerPage = 5;
    expect(component.totalPages).toBe(5);
  });

  it('should generate correct array of pages', () => {
    component.totalProducts = 25;
    component.productsPerPage = 5;
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
  });
});
