export class Amount {

  constructor({ value, symbol } = {}) {
    const parsedValue = Number(value);
    this.value = isNaN(parsedValue) ? 0 : value;
    this.symbol = symbol || '€';
  }

}