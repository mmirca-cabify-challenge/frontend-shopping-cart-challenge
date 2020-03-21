import { LitElement, html } from "lit-element";

export class AppSummary extends LitElement {

  render() {
    return html`
    <link href="./assets/css/main.css" rel="stylesheet" />
    <h1 class="summary__main-title">Order Summary</h1>
      <ul class="summary-items wrapper border">
        <li class="summary__list-item">
          <span class="summary-items-number">11 Items</span>
          <span class="summary__items-price">
            120<span class="currency">€</span>
          </span>
        </li>
      </ul>
      <div class="summary-discounts wrapper-half border">
        <h2>Discounts</h2>
        <ul>
          <li class="summary__list-item">
            <span>2x1 Mug offer</span>
            <span>-10€</span>
          </li>
          <li class="summary__list-item">
            <span>x3 Shirt offer</span>
            <span>-3€</span>
          </li>
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
            ><span class="summary__total-price">107€</span>
          </li>
        </ul>
        <button class="summary__submit" type="submit">Checkout</button>
      </div>
    `;
  }

}

customElements.define('app-summary', AppSummary);