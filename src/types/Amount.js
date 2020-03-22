export class Amount {

  constructor({ value, symbol } = {}) {
    this.value = value || 0;
    this.symbol = symbol || '€';
  }

}