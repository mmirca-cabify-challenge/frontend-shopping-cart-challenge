import { LitElement, html } from 'lit-element';
import './components/app-product/app-product';
import CheckoutService from '../../services/checkout.service';

export class AppProducts extends LitElement {

  static get properties() {
    return {
      products: {
        type: Array
      }
    }
  }

  constructor(checkoutSrv = CheckoutService) {
    super();
    this.products = [];
    this.checkoutSrv = checkoutSrv;
    this._subscriptions = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscriptions.push(
      this.checkoutSrv.checkoutProducts$.subscribe((products) => {
        this.products = products;
      })
    );
  }

  disconnectedCallback() {
    this._subscriptions
      .forEach((subscription) => subscription.unsubscribe());
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