import { LitElement, html } from 'lit-element';

export class AppDetail extends LitElement {

  render() {
    return html`
      <link href="./assets/css/main.css" rel="stylesheet" />
      <h1>App detail</h1>
    `;
  }

}

customElements.define('app-detail', AppDetail);