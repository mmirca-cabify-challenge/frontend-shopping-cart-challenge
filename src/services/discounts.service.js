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

  getAppliedDiscounts(checkoutProducts, availableDiscounts) {
    if (!checkoutProducts instanceof Array) {
      return [];
    }
    const purchasedProducts = this._getPurchasedProducts(checkoutProducts);
    return this._getAppliedDiscounts(purchasedProducts, availableDiscounts);
  }

  total(appliedDiscounts) {
    return appliedDiscounts
      .map((appliedDiscount) => appliedDiscount.count * appliedDiscount.amount.value)
      .reduce((totalDiscount = 0, discountAmount) => totalDiscount + discountAmount);
  }

  _getPurchasedProducts(checkoutProducts) {
    const purchasedProducts = {};
    checkoutProducts.forEach((checkoutProduct) => {
      const { title, count } = checkoutProduct;
      if (!purchasedProducts[title]) {
        purchasedProducts[title] = 0;
      }
      purchasedProducts[title] = purchasedProducts[title] + count;
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

}

export default new DiscountsService();