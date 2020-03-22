import ProductsService from "./products.service";
import { BehaviorSubject } from 'rxjs';

export class CheckoutService {

  get products$() {
    return this._products$;
  }

  constructor({ products }) {
    this._products = (products instanceof Array ? products : [])
      .map((product) => ({ ...product, count: 0 }));
    this._products$ = new BehaviorSubject(this._products);
  }

  unscan(productTitle) {
    const updatedProducts = this._getUpdateProductCount(productTitle, -1);
    this._products$.next(updatedProducts);
    return this;
  }

  scan(productTitle) {
    const updatedProducts = this._getUpdateProductCount(productTitle, 1);
    this._products$.next(updatedProducts);
    return this;
  }

  _getUpdateProductCount(productTitle, increment) {
    return this._products.map((product) => {
      if (product.title === productTitle) {
        product.count = Math.max(0, product.count + increment);
        return {...product};
      }
      return product;
    });
  }

}

export default new CheckoutService({
  products: ProductsService.products
});