import { LitElement, html } from "lit-element";

export class AppSummary extends LitElement {

  static get properties() {
    return {
      appliedDiscounts: { type: Array },
      itemsCount: { type: Number },
      rawTotal: { type: Number },
      total: { type: Number }
    }
  }

  constructor() {
    super();
    this.rawTotal = 0;
    this.total = 0;
    this.appliedDiscounts = [];
    this.itemsCount = 0;
  }

  render() {
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <h1 class="summary__main-title">Order Summary</h1>
      <ul class="summary-items wrapper border">
        <li class="summary__list-item">
          <span class="summary-items-number">${this.itemsCount} Items</span>
          <span class="summary__items-price">
            ${this.rawTotal}<span class="currency">€</span>
          </span>
        </li>
      </ul>
      <div class="summary-discounts wrapper-half border">
        <h2>Discounts</h2>
        <ul>
          ${this.appliedDiscounts.map((discount) => html`
            <li class="summary__list-item">
              <span>${discount.title}</span>
              <span>-${discount.amount.value * discount.count}${discount.amount.symbol}</span>
            </li>
          `)}
          <li class="summary__list-item">
            <span>Promo code</span>
            <span>0€</span>
          </li>
        </ul>
      </div>
      <div class="summary__total wrapper">
        <ul>
          <li class="summary__list-item">
            <span class="summary__total-cost">Total cost</span
            ><span class="summary__total-price">${this.total}€</span>
          </li>
        </ul>
        <button class="summary__submit" type="submit">Checkout</button>
      </div>
    `;
  }

}

customElements.define('app-summary', AppSummary);