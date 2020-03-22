import ProductsService from "./products.service";
import { BehaviorSubject } from 'rxjs';
import { CheckoutProduct } from "../types";
import DiscountsService from "./discounts.service";

export class CheckoutService {

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

  get checkoutProducts$() {
    return this._checkoutProducts$;
  }

  /**
   * To unscan a product we find the product by the provided title and we
   * update the products list by removing one
   * @param {String} productTitle 
   */
  unscan(productTitle) {
    this._checkoutProducts = this._getUpdatedCheckoutProducts(productTitle, -1);
    this._checkoutProducts$.next(this._checkoutProducts);
    return this;
  }

  /**
   * To scan a product we find the product by the provided title and we
   * update the products list by adding one
   * @param {String} productTitle 
   */
  scan(productTitle) {
    this._checkoutProducts = this._getUpdatedCheckoutProducts(productTitle, 1);
    this._checkoutProducts$.next(this._checkoutProducts);
    return this;
  }

  /**
   * To retrieve the items count we iterate the products list and
   * add up each item's count
   */
  itemsCount() {
    return this._checkoutProducts
      .map((checkoutProduct) => checkoutProduct.count)
      .reduce((totalCount, count) => totalCount + count);
  }

  /**
   * To get the raw total we iterate the products list and add up each item's price
   */
  rawTotal() {
    return this._checkoutProducts
      .map((checkoutProduct) => checkoutProduct.count * checkoutProduct.price.value)
      .reduce((total = 0, productPrice) => total + productPrice);
  }

  /**
   * To get the total we iterate the products list and add up each item's price
   * then we substract the applied discounts
   */
  total() {
    const rawTotal = this.rawTotal();
    const appliedDiscounts = this.getAppliedDiscounts();
    const discountTotal = this.discountSrv.total(appliedDiscounts);
    return rawTotal - discountTotal;
  }

  /**
   * To get the applied discounts we call the discounts service with the
   * current products and discounts
   */
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