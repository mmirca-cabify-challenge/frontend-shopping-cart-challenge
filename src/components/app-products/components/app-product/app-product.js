import { LitElement, html } from "lit-element";
import { Product } from "../../../../types";

export class AppProduct extends LitElement {

  static get properties() {
    return {
      product: {
        type: Object
      },
      count: {
        type: Number
      }
    }
  }

  constructor() {
    super();
    this.count = 0;
  }

  set product(val) {
    if (val instanceof Product) {
      this._product = val;
    }
  }

  render() {
    if (!this._product) {
      return html`
        <p>Unable to load product</p>
      `;
    }
    const { image, code, title, price } = this._product;
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <div class="row">
        <div class="col-product">
          <figure class="products__image-container">
            <img class="products__image" src="${image.src}" alt=${image.alt} />
            <div class="product-description">
              <h1 class="products__item-title">${title}</h1>
              <p class="products__code">Product code ${code}</p>
            </div>
          </figure>
        </div>
        <div class="col-quantity">
          <button
            class="products__count-button"
            @click="${this._updateCount.bind(this, -1)}"
          >-</button>
          <input
            type="text"
            class="products__quantity"
            value="${this.count}"
          />
          <button
            class="products__count-button"
            @click="${this._updateCount.bind(this, 1)}"
          >+</button>
        </div>
        <div class="col-price">
          <span class="products__price">${price.value}</span
          ><span class="product-currency currency">${price.symbol}</span>
        </div>
        <div class="col-total">
          <span class="products__price">${price.value * this.count}</span
          ><span class="product-currency currency">${price.symbol}</span>
        </div>
      </div>
    `;
  }

  _updateCount(increment) {
    const newAmount = Math.floor(this.count + increment);
    this.count = Math.max(newAmount, 0);
  }

}

customElements.define('app-product', AppProduct);