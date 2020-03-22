import { Product, Amount, Image } from "../types";

export class ProductsService {
  get products() {
    return [
      new Product(
        new Image('./assets/img/shirt.png', 'Shirt' ),
        'Shirt',
        'X7R2OPX',
        new Amount(20),
        0
      ),
      new Product(
        new Image('./assets/img/mug.png', 'Mug'),
        'Mug',
        'X2G2OPZ',
        new Amount(5),
        0
      ),
      new Product(
        new Image('./assets/img/cap.png', 'Cap'),
        'Cap',
        'X3W2OPY',
        new Amount(10),
        0
      )
    ];
  }
}

export default new ProductsService();