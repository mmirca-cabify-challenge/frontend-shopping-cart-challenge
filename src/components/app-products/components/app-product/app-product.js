import { LitElement, html } from "lit-element";
import { Product } from "../../types/Product";

export class AppProduct extends LitElement {

  static get properties() {
    return {
      product: {
        type: Object
      }
    }
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
          <button class="products__count-button">-</button>
          <input
            type="text"
            class="products__quantity"
            value="3"
          />
          <button class="products__count-button">+</button>
        </div>
        <div class="col-price">
          <span class="products__price">${price.value}</span
          ><span class="product-currency currency">${price.symbol}</span>
        </div>
        <div class="col-total">
          <span class="products__price">60</span
          ><span class="product-currency currency">€</span>
        </div>
      </div>
    `;
  }

}

customElements.define('app-product', AppProduct);