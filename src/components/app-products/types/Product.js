import { Image } from "./Image";
import { Amount } from "../../../types";

export class Product {
  constructor(image, title, code, price) {
    this.image = image instanceof Image ? image : new Image();
    this.title = title || '';
    this.code = code || '';
    this.price = price instanceof Amount ? price : new Amount(0);
  }
}