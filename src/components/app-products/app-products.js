import { LitElement, html } from 'lit-element';
import './components/app-product/app-product';
import { Product, Image } from './types';
import { Amount } from '../../types';

export class AppProducts extends LitElement {

  render() {
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <h1 class="border-bottom-title">Shopping cart</h1>
      <ul class="products__list tableHead">
        <li class="products__list-title row">
          <div class="col-product">Product details</div>
          <div class="col-quantity">Quantity</div>
          <div class="col-price">Price</div>
          <div class="col-total">Total</div>
        </li>
      </ul>
      <ul class="products__list">
        ${this._getProducts().map((product) => html`
          <li class="product">
            <app-product .product=${product}></app-product>
          </li>
        `)}
      </ul>
    `;
  }

  _getProducts() {
    return [
      new Product(
        new Image('./assets/img/shirt.png', 'Shirt' ),
        'Shirt',
        'X7R2OPX',
        new Amount(20)
      ),
      new Product(
        new Image('./assets/img/mug.png', 'Mug'),
        'Mug',
        'X2G2OPZ',
        new Amount(5)
      ),
      new Product(
        new Image('./assets/img/cap.png', 'Cap'),
        'Cap',
        'X3W2OPY',
        new Amount(10)
      )
    ];
  }

}

customElements.define('app-products', AppProducts);