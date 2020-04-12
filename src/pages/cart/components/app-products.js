import { LitElement, html } from 'lit-element';
import './app-product';

export class AppProducts extends LitElement {

  static get properties() {
    return {
      products: { type: Array }
    }
  }

  constructor() {
    super();
    this.products = [];
  }

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
        ${this.products.map((product) => html`
          <li class="product">
            <app-product .product=${product}></app-product>
          </li>
        `)}
      </ul>
    `;
  }

}

customElements.define('app-products',  AppProducts);