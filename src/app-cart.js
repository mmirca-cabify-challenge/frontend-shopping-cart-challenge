import { LitElement, html } from 'lit-element';
import './components/app-products/app-products';
import './components/app-summary/app-summary';
import CheckoutService from './services/checkout.service';

export class AppCart extends LitElement {

  static get properties() {
    return {
      products: { type: Array }
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
      <main class="App">
        <section class="products">
          <app-products .products=${this.products}></app-products>
        </section>
        <aside class="summary">
          <app-summary></app-summary>
        </aside>
      </main>
    `;
  }

}

customElements.define('app-cart', AppCart);