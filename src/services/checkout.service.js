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
      .map((product) => new CheckoutProduct(product));
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
    this._updateCheckoutProducts(
      productTitle,
      (count) => count - 1
    );
    return this;
  }

  /**
   * To scan a product we find the product by the provided title and we
   * update the products list by adding one
   * @param {String} productTitle 
   */
  scan(productTitle) {
    this._updateCheckoutProducts(
      productTitle,
      (count) => count + 1  
    );
    return this;
  }

  /**
   * To update a product count we find the product by the provided title and we
   * update the products list by setting the new count
   * @param {String} productTitle 
   */
  updateProductCount(productTitle, newCount) {
    this._updateCheckoutProducts(
      productTitle,
      () => newCount
    );
    return this;
  }

  /**
   * To retrieve the items count we iterate the products list and
   * add up each item's count
   */
  itemsCount() {
    return this._checkoutProducts
      .map((checkoutProduct) => checkoutProduct.count)
      .reduce((totalCount, count) => totalCount + count, 0);
  }

  /**
   * To get the raw total we iterate the products list and add up each item's price
   */
  rawTotal() {
    return this._checkoutProducts
      .map((checkoutProduct) => checkoutProduct.count * checkoutProduct.price.value)
      .reduce((total, productPrice) => total + productPrice, 0);
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
    return this.discountSrv.getAppliedDiscounts(this._checkoutProducts);
  }

  _updateCheckoutProducts(productTitle, countHandler) {
    if (!(countHandler instanceof Function)) {
      return this._checkoutProducts;
    }
    this._checkoutProducts = this._checkoutProducts
      .map((checkoutProduct) => {
        if (checkoutProduct.title !== productTitle) {
          return checkoutProduct;
        }
        return new CheckoutProduct({
          ...checkoutProduct,
          count: countHandler(checkoutProduct.count)
        });
      });
    this._checkoutProducts$.next(this._checkoutProducts);
  }

}

export default new CheckoutService({
  products: ProductsService.products,
  discounts: DiscountsService.availableDiscounts 
});