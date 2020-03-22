import ProductsService from "./products.service";
import { BehaviorSubject } from 'rxjs';
import { CheckoutProduct } from "../types";
import DiscountsService from "./discounts.service";

export class CheckoutService {

  get checkoutProducts$() {
    return this._checkoutProducts$;
  }

  constructor({
    products,
    discounts,
    discountSrv = DiscountsService
  } = {}) {
    this._checkoutProducts = (products instanceof Array ? products : [])
      .map((product) => new CheckoutProduct({ ...product, count: 0 }));
    this._checkoutProducts$ = new BehaviorSubject(this._checkoutProducts);
    this._checkoutDiscounts = discounts;
    this.discountSrv = discountSrv;
  }

  unscan(productTitle) {
    this._checkoutProducts = this._getUpdatedCheckoutProducts(productTitle, -1);
    this._checkoutProducts$.next(this._checkoutProducts);
    return this;
  }

  scan(productTitle) {
    this._checkoutProducts = this._getUpdatedCheckoutProducts(productTitle, 1);
    this._checkoutProducts$.next(this._checkoutProducts);
    return this;
  }

  rawTotal() {
    return this._checkoutProducts
      .map((checkoutProduct) => checkoutProduct.count * checkoutProduct.price.value)
      .reduce((total = 0, productPrice) => total + productPrice);
  }

  total() {
    const rawTotal = this.rawTotal();
    const appliedDiscounts = this.getAppliedDiscounts();
    const discountTotal = this.discountSrv.total(appliedDiscounts);
    return rawTotal - discountTotal;
  }

  getAppliedDiscounts() {
    return this.discountSrv.getAppliedDiscounts(this._checkoutProducts, this._checkoutDiscounts);
  }

  _getUpdatedCheckoutProducts(productTitle, increment) {
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
  products: ProductsService.products,
  discounts: DiscountsService.availableDiscounts 
});