import { Product } from "./Product";

export class CheckoutProduct extends Product {

  constructor({ image, title, code, price, count } = {}) {
    super({ image, title, code, price });
    this.count = count || 0;
  }

  set count(val) {
    this._count = Math.max(0, val);
  }

  get count() {
    return this._count;
  }

}