import { CheckoutService } from '../src/services/checkout.service';
import { getProductsMock } from './mocks';
import { first } from 'rxjs/operators';

describe('CheckoutService', () => {
  let fixture;
  beforeEach(() => {
    fixture = new CheckoutService({
      products: getProductsMock(),
      discountSrv: {
        getAppliedDiscounts: jest.fn(),
        total: jest.fn(() => 0)
      }
    });
  });
  it('should expose an observable that emits the current products on subscription when instantiated', (done) => {
    fixture.checkoutProducts$
      .pipe(first())
      .subscribe((products) => {
        const expectedProductTitles = ['Shirt', 'Mug', 'Cap'];
        const expectedProducts = products.filter((product) => expectedProductTitles.includes(product.title));
        expect(expectedProducts.length).toBe(3);
        done();
      });
  });
  it('should emit an empty products array when instantiated without products', (done) => {
    fixture = new CheckoutService();
    fixture.checkoutProducts$
      .pipe(first())
      .subscribe((products) => {
        expect(products).toEqual([]);
        done();
      });
  });
  describe('scan()', () => {
    it('should add one to the shirt counter when called with "Shirt"', (done) => {
      fixture.scan('Shirt');
      fixture.checkoutProducts$
        .pipe(first())
        .subscribe((products) => {
          const shirt = products.find((product) => product.title === 'Shirt');
          expect(shirt.count).toBe(1);
          done();
        });
    });
    it('should add two to the shirt counter when chain called twice with "Shirt"', (done) => {
      fixture.scan('Shirt').scan("Shirt");
      fixture.checkoutProducts$
        .pipe(first())
        .subscribe((products) => {
          const shirt = products.find((product) => product.title === 'Shirt');
          expect(shirt.count).toBe(2);
          done();
        });
    });
  });
  describe('unscan()', () => {
    it('should set the shirt counter to 0 when called with "Shirt" and the counter is already 0', (done) => {
      fixture.unscan('Shirt');
      fixture.checkoutProducts$
        .pipe(first())
        .subscribe((products) => {
          const shirt = products.find((product) => product.title === 'Shirt');
          expect(shirt.count).toBe(0);
          done();
        });
    });
    it('should substract one from the shirt counter when called with "Shirt', (done) => {
      fixture = new CheckoutService({
        products: getProductsMock()
          .map((product) => ({ ...product, count: 5 }))
      });
      fixture.unscan('Shirt');
      fixture.checkoutProducts$
        .pipe(first())
        .subscribe((products) => {
          const shirt = products.find((product) => product.title === 'Shirt');
          expect(shirt.count).toBe(4);
          done();
        });
    });
    it('should substract two from the shirt counter when chain called twice with "Shirt', (done) => {
      fixture = new CheckoutService({
        products: getProductsMock()
          .map((product) => ({ ...product, count: 5 }))
      });
      fixture.unscan('Shirt').unscan("Shirt");
      fixture.checkoutProducts$
        .pipe(first())
        .subscribe((products) => {
          const shirt = products.find((product) => product.title === 'Shirt');
          expect(shirt.count).toBe(3);
          done();
        });
    });
    describe('itemsCount()', () => {
      it('should return 0 when called and there are no scanned products', () => {
        fixture = new CheckoutService();
        expect(fixture.itemsCount()).toBe(0);
      });
      it('should return 15 when called and there are 15 scanned products', () => {
        fixture = new CheckoutService({
          products: getProductsMock()
            .map((product) => ({ ...product, count: 5 }))
        });
        expect(fixture.itemsCount()).toBe(15);
      });
    });
    describe('rawTotal()', () => {
      it('should return 0 when called and there are no scanned products', () => {
        fixture = new CheckoutService();
        expect(fixture.rawTotal()).toBe(0);
      });
      it('should return 20 when called and there is one "Shirt" scanned', () => {
        fixture = new CheckoutService({
          products: getProductsMock()
            .filter((product) => product.title === 'Shirt')
            .map((product) => ({ ...product, count: 1 }))
        });
        expect(fixture.rawTotal()).toBe(20);
      });
    });
    describe('total()', () => {
      it('should retrieve the total discount by calling the discount service when called', () => {
        fixture.total();
        expect(fixture.discountSrv.getAppliedDiscounts.mock.calls.length).toBe(1);
        expect(fixture.discountSrv.total.mock.calls.length).toBe(1);
      });
      it('should return 0 when called and there are no scanned products', () => {
        expect(fixture.total()).toBe(0);
      });
      it('should return 10 when called and there is one "Shirt" scanned with 10 discount', () => {
        fixture = new CheckoutService({
          products: getProductsMock()
            .filter((product) => product.title === 'Shirt')
            .map((product) => ({ ...product, count: 1 })),
          discountSrv: {
            getAppliedDiscounts: () => {},
            total: () => 10
          }
        });
        expect(fixture.total()).toBe(10);
      });
    });
  });
});