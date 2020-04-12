import { Product } from "./Product";

export class CheckoutProduct extends Product {

  constructor({ count, ...product } = {}) {
    super(product);
    this.count = count || 0;
  }

  set count(val) {
    const newCount = parseInt(val);
    if (!isNaN(newCount)) {
      this._count = Math.max(0, Math.floor(newCount));
    } else {
      this._count = 0;
    }
  }

  get count() {
    return this._count;
  }

}