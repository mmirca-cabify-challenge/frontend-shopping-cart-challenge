import { LitElement, html } from 'lit-element';

export class AppCart extends LitElement {
  render() {
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <main class="App">
        <section class="products">
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
            <li class="product row">
              <div class="col-product">
                <figure class="products__image-container">
                  <img class="products__image" src="./assets/img/shirt.png" alt="Shirt" />
                  <div class="product-description">
                    <h1 class="products__item-title">Shirt</h1>
                    <p class="products__code">Product code X7R2OPX</p>
                  </div>
                </figure>
              </div>
              <div class="col-quantity">
                <button class="products__count-button">-</button
                ><input type="text" class="products__quantity" value="3" /><button
                  class="products__count-button"
                >
                  +
                </button>
              </div>
              <div class="col-price">
                <span class="products__price">20</span
                ><span class="product-currency currency">€</span>
              </div>
              <div class="col-total">
                <span class="products__price">60</span
                ><span class="product-currency currency">€</span>
              </div>
            </li>
            <li class="product row">
              <div class="col-product">
                <figure class="products__image-container">
                  <img class="products__image" src="./assets/img/mug.png" alt="Mug" />
                  <div class="product-description">
                    <h1 class="products__item-title">Mug</h1>
                    <p class="products__code">Product code X2G2OPZ</p>
                  </div>
                </figure>
              </div>
              <div class="col-quantity">
                <button class="products__count-button">-</button
                ><input type="text" class="products__quantity" value="4" /><button
                  class="products__count-button"
                >
                  +
                </button>
              </div>
              <div class="col-price">
                <span class="products__price">5</span
                ><span class="product-currency currency">€</span>
              </div>
              <div class="col-total">
                <span class="products__price">20</span
                ><span class="product-currency currency">€</span>
              </div>
            </li>
            <li class="product row">
              <div class="col-product">
                <figure class="products__image-container">
                  <img class="products__image" src="./assets/img/cap.png" alt="Cap" />
                  <div class="product-description">
                    <h1 class="products__item-title">Cap</h1>
                    <p class="products__code">Product code X3W2OPY</p>
                  </div>
                </figure>
              </div>
              <div class="col-quantity">
                <button class="products__count-button">-</button
                ><input type="text" class="products__quantity" value="4" /><button
                  class="products__count-button"
                >
                  +
                </button>
              </div>
              <div class="col-price">
                <span class="products__price">10</span
                ><span class="product-currency currency">€</span>
              </div>
              <div class="col-total">
                <span class="products__price">40</span
                ><span class="product-currency currency">€</span>
              </div>
            </li>
          </ul>
        </section>
        <aside class="summary">
          <h1 class="summary__main-title">Order Summary</h1>
          <ul class="summary-items wrapper border">
            <li class="summary__list-item">
              <span class="summary-items-number">11 Items</span
              ><span class="summary__items-price"
                >120<span class="currency">€</span></span
              >
            </li>
          </ul>
          <div class="summary-discounts wrapper-half border">
            <h2>Discounts</h2>
            <ul>
              <li class="summary__list-item">
                <span>2x1 Mug offer</span><span>-10€</span>
              </li>
              <li class="summary__list-item">
                <span>x3 Shirt offer</span><span>-3€</span>
              </li>
              <li class="summary__list-item">
                <span>Promo code</span><span>0€</span>
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
        </aside>
      </main>
    `;
  }
}

customElements.define('app-cart', AppCart);