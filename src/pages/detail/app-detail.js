import { LitElement, html } from 'lit-element';

export class AppDetail extends LitElement {

  render() {
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <main class="App">
        <div
          class="products products--detail"
          style="background-image: url(./assets/img/mug-xl.jpg)"
        ></div>
        <div class="summary summary--detail">
          <div>
            <div class="summary__close-wrapper">
              <a router-link href="/" class="summary__close">
                &times;
              </a>
            </div>
            <h1 class="border-bottom-title">
              <span>Shopping cart</span>
              <span>20€</span>
            </h1>
            <p class="summary__main-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.
            </p>
            <p class="summary__code">Product code X7R2OPX</p>
          </div>
          <button class="summary__submit" type="submit">Add to cart</button>
        </div>
      </main>
    `;
  }

}

customElements.define('app-detail', AppDetail);