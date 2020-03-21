import { LitElement, html } from 'lit-element';
import './components/app-products/app-products';
import './components/app-summary/app-summary';

export class AppCart extends LitElement {
  render() {
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <main class="App">
        <section class="products">
          <app-products></app-products>
        </section>
        <aside class="summary">
          <app-summary></app-summary>
        </aside>
      </main>
    `;
  }
}

customElements.define('app-cart', AppCart);