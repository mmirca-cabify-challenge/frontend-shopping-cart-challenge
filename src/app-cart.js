import { LitElement, html } from 'lit-element';
import './components/app-products/app-products';
import './components/app-summary/app-summary';
import CheckoutService from './services/checkout.service';

export class AppCart extends LitElement {

  static get properties() {
    return {
      products: { type: Array },
      appliedDiscounts: { type: Array }
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
        this.appliedDiscounts = this.checkoutSrv.getAppliedDiscounts();
      })
    );
  }

  disconnectedCallback() {
    this._subscriptions
      .forEach((subscription) => subscription.unsubscribe());
  }

  render() {
    const rawTotal = this.checkoutSrv.rawTotal();
    const total = this.checkoutSrv.total();
    const itemsCount = this.checkoutSrv.itemsCount();
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <main class="App">
        <section class="products">
          <app-products .products=${this.products}></app-products>
        </section>
        <aside class="summary">
          <app-summary
            total="${total}"
            rawTotal="${rawTotal}"
            itemsCount="${itemsCount}"
            .appliedDiscounts=${this.appliedDiscounts}
          ></app-summary>
        </aside>
      </main>
    `;
  }

}

customElements.define('app-cart', AppCart);