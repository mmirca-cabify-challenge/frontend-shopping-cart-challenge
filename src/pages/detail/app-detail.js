import { LitElement, html } from 'lit-element';
import CheckoutService from '../../services/checkout.service';
import { Router } from '@vaadin/router';

export class AppDetail extends LitElement {

  static get properties() {
    return {
      product: { type: Object },
      code: { type: String }
    }
  }

  constructor(
    checkoutSrv = CheckoutService,
    router = Router
  ) {
    super();
    this.products = [];
    this.checkoutSrv = checkoutSrv;
    this._subscriptions = [];
    this.router = router;
    this.code = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.code = ((this.location || {}).params || {}).code;
    this._subscriptions.push(
      this.checkoutSrv.checkoutProducts$.subscribe((products) => {
        const foundProduct = products.find((product) => product.code === this.code);
        if (!foundProduct || !this.code) {
          this.router.go('/');
        }
        this.product = foundProduct;
      })
    );
  }

  disconnectedCallback() {
    this._subscriptions
      .forEach((subscription) => subscription.unsubscribe());
  }

  render() {
    if (!this.product) {
      return;
    }
    const { image, title, code, description, price } = this.product;
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <main class="App">
        <div
          class="products products--detail"
          style="background-image: url(${image.src})"
        ></div>
        <div class="summary summary--detail">
          <div>
            <div class="summary__close-wrapper">
              <a router-link href="/" class="summary__close">
                &times;
              </a>
            </div>
            <h1 class="border-bottom-title">
              <span>${title}</span>
              <span>${price.value}${price.symbol}</span>
            </h1>
            <p class="summary__main-text">
              ${description}
            </p>
            <p class="summary__code">Product code ${code}</p>
          </div>
          <button
            class="summary__submit"
            @click="${this._scan.bind(this, title)}"
            type="submit"
          >Add to cart</button>
        </div>
      </main>
    `;
  }

  _scan(productTitle) {
    this.checkoutSrv.scan(productTitle);
    this.router.go('/');
  }

}

customElements.define('app-detail', AppDetail);