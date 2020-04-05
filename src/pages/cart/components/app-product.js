import { LitElement, html } from "lit-element";
import CheckoutService from '../../../services/checkout.service';

export class AppProduct extends LitElement {

  static get properties() {
    return {
      product: {
        type: Object
      }
    }
  }

  constructor(checkoutSrv = CheckoutService) {
    super();
    this.checkoutSrv = checkoutSrv;
  }


  render() {
    const { image, code, title, price, count } = this.product;
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
            @click="${this._unscan.bind(this, title)}"
          >-</button>
          <input
            type="text"
            class="products__quantity"
            value="${count}"
          />
          <button
            class="products__count-button"
            @click="${this._scan.bind(this, title)}"
          >+</button>
        </div>
        <div class="col-price">
          <span class="products__price">${price.value}</span
          ><span class="product-currency currency">${price.symbol}</span>
        </div>
        <div class="col-total">
          <span class="products__price">${price.value * count}</span
          ><span class="product-currency currency">${price.symbol}</span>
        </div>
      </div>
    `;
  }

  _unscan(productTitle) {
    this.checkoutSrv.unscan(productTitle);
  }

  _scan(productTitle) {
    this.checkoutSrv.scan(productTitle);
  }

}

customElements.define('app-product', AppProduct);