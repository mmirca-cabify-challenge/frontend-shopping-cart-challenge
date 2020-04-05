import { Image } from "./Image";
import { Amount } from "./Amount";

export class Product {

  constructor({ image, title, code, price, description } = {}) {
    this.image = image instanceof Image ? image : new Image();
    this.title = title || '';
    this.code = code || '';
    this.description = description || '';
    this.price = price instanceof Amount ? price : new Amount();
  }

}