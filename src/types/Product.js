import { Image } from "./Image";
import { Amount } from "./Amount";

export class Product {

  constructor({ image, title, code, price, description } = {}) {
    this.image = image instanceof Image ? image : new Image();
    this.title = title || '';
    this.code = code || '';
    this.description = description || '';
    if (price instanceof Amount) {
      this.price = price
    } else {
      this.price = new Amount({ value: (price || {}).value });
    }
  }

}