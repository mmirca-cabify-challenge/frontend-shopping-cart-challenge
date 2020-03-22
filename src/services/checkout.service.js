import ProductsService from "./products.service";
import { BehaviorSubject } from 'rxjs';
import { CheckoutProduct } from "../types";

export class CheckoutService {

  get checkoutProducts$() {
    return this._checkoutProducts$;
  }

  constructor({ products }) {
    this._checkoutProducts = (products instanceof Array ? products : [])
      .map((product) => new CheckoutProduct({ ...product, count: 0 }));
    this._checkoutProducts$ = new BehaviorSubject(this._checkoutProducts);
  }

  unscan(productTitle) {
    this._checkoutProducts = this._getUpdateProductCount(productTitle, -1);
    this._checkoutProducts$.next(this._checkoutProducts);
    return this;
  }

  scan(productTitle) {
    this._checkoutProducts = this._getUpdateProductCount(productTitle, 1);
    this._checkoutProducts$.next(this._checkoutProducts);
    return this;
  }

  _getUpdateProductCount(productTitle, increment) {
    return this._checkoutProducts
      .map((checkoutProduct) => {
        if (checkoutProduct.title !== productTitle) {
          return checkoutProduct;
        }
        return new CheckoutProduct({
          ...checkoutProduct,
          count: checkoutProduct.count + increment
        });
      });
  }

}

export default new CheckoutService({
  products: ProductsService.products
});