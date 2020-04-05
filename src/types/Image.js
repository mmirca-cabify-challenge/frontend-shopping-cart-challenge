export class Image {

  constructor({ src, alt, thumbnail } = {}) {
    this.src = src || '';
    this.alt = alt || '';
    this.thumbnail = thumbnail || '';
  }

}