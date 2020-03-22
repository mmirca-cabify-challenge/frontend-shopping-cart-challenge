import { Product, Amount, Image } from "../types";

export class ProductsService {

  get products() {
    return [
      new Product({
        image: new Image({
          src: './assets/img/shirt.png',
          alt: 'Shirt'
        }),
        title: 'Shirt',
        code: 'X7R2OPX',
        price: new Amount({ value: 20 })
      }),
      new Product({
        image: new Image({
          src: './assets/img/mug.png',
          alt: 'Mug'
        }),
        title: 'Mug',
        code: 'X2G2OPZ',
        price: new Amount({ value: 5 })
      }),
      new Product({
        image: new Image({
          src: './assets/img/cap.png',
          alt: 'Cap'
        }),
        title: 'Cap',
        code: 'X3W2OPY',
        price: new Amount({ value: 10 })
      })
    ];
  }

}

export default new ProductsService();