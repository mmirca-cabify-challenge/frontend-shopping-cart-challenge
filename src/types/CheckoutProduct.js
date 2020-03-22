import { Product } from "./Product";

export class CheckoutProduct extends Product {

  constructor({ count, ...product } = {}) {
    super(product);
    this.count = count || 0;
  }

  set count(val) {
    this._count = Math.max(0, val);
  }

  get count() {
    return this._count;
  }

}