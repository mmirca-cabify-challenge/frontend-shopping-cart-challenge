import { Amount } from "./Amount";

export class Discount {
  constructor({ title, amount, conditions } = {}) {
    this.title = title || '';
    this.amount = amount instanceof Amount ? amount : new Amount(0);
    this.conditions = conditions instanceof Array ? conditions : [];
  }
}