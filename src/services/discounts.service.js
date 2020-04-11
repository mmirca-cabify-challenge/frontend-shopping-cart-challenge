import { Amount } from "../types";
import { Discount, DiscountCondition, AppliedDiscount } from "../types";

export class DiscountsService {

  get availableDiscounts() {
    return [
      new Discount({
        title: '2x1 Mug offer',
        amount: new Amount({ value: 5 }),
        conditions: [
          new DiscountCondition({
            productTitle: 'Mug',
            count: 2
          })
        ]
      }),
      new Discount({
        title: 'x3 Shirt offer',
        amount: new Amount({ value: 3 }),
        conditions: [
          new DiscountCondition({
            productTitle: 'Shirt',
            count: 3
          })
        ]
      })
    ]
  }

  /**
   * To get the applied discounts we iterate the products and find out how many
   * times it matches each one of the available discounts
   * @param {Array} checkoutProducts 
   * @param {Array} availableDiscounts 
   */
  getAppliedDiscounts(checkoutProducts, availableDiscounts) {
    if (!this._isArray(checkoutProducts) || !this._isArray(availableDiscounts)) {
      return [];
    }
    const purchasedProducts = this._getPurchasedProducts(checkoutProducts);
    return this._getAppliedDiscounts(purchasedProducts, availableDiscounts);
  }

  /**
   * To get the total we iterate each applied discount and add up the each one's count
   * @param {Array} appliedDiscounts 
   */
  total(appliedDiscounts) {
    if (!this._isArray(appliedDiscounts)) {
      return 0;
    }
    return appliedDiscounts
      .map((appliedDiscount) => appliedDiscount.count * appliedDiscount.amount.value)
      .reduce((totalDiscount, discountAmount) => totalDiscount + discountAmount, 0);
  }

  _getPurchasedProducts(checkoutProducts) {
    const purchasedProducts = {};
    checkoutProducts.forEach((checkoutProduct) => {
      const { title, count } = checkoutProduct;
      purchasedProducts[title] = count;
    });
    return purchasedProducts;
  }

  _getAppliedDiscounts(purchasedProducts, availableDiscounts) {
    return availableDiscounts.map((discount) => {
      const countOfAppliedCondtions = discount.conditions
        .map((discountCondition) => {
          const purchasedProductCount = purchasedProducts[discountCondition.productTitle];
          const amountOfTimesAbleToApplyCondition = purchasedProductCount / discountCondition.count;
          return Math.floor(amountOfTimesAbleToApplyCondition);
        });
      return new AppliedDiscount({
        ...discount,
        count: Math.min(...countOfAppliedCondtions)
      });
    });
  }

  _isArray(arr) {
    return arr instanceof Array;
  }

}

export default new DiscountsService();