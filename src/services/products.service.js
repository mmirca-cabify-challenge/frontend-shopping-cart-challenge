import { Product, Amount, Image } from "../types";

export class ProductsService {

  get products() {
    return [
      new Product({
        image: new Image({
          thumbnail: './assets/img/shirt.png',
          src: './assets/img/shirt-xl.jpg',
          alt: 'Shirt'
        }),
        title: 'Shirt',
        code: 'X7R2OPX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.',
        price: new Amount({ value: 20 })
      }),
      new Product({
        image: new Image({
          thumbnail: './assets/img/mug.png',
          src: './assets/img/mug-xl.jpg',
          alt: 'Mug'
        }),
        title: 'Mug',
        code: 'X2G2OPZ',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.',
        price: new Amount({ value: 5 })
      }),
      new Product({
        image: new Image({
          thumbnail: './assets/img/cap.png',
          src: './assets/img/cap-xl.jpg',
          alt: 'Cap'
        }),
        title: 'Cap',
        code: 'X3W2OPY',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.',
        price: new Amount({ value: 10 })
      })
    ];
  }

}

export default new ProductsService();