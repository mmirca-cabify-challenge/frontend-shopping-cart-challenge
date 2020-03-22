import { Discount } from "./Discount";

export class AppliedDiscount extends Discount {

  constructor({ count, ...discount } = {}) {
    super(discount);
    this.count = count || 0;
  }

  set count(val) {
    this._count = Math.max(Math.floor(val), 0);
  }

  get count() {
    return this._count;
  }

}