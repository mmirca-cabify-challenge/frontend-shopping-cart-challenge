import { DiscountsService } from '../src/services/discounts.service';
import {
  getMugProductMock,
  getDiscountsMock,
  getAppliedMugDiscountMock
} from './mocks';

describe('DiscountsService', () => {
  
  let fixture;

  beforeEach(() => {
    fixture = new DiscountsService();
  });

  describe('getAppliedDiscounts()', () => {
    it('should return an empty array when called without arguments', () => {
      expect(fixture.getAppliedDiscounts()).toEqual([]);
    });
    it('should return a "Mug" discount when called with products count that can benefit from "Mug" discount', () => {
      const appliedDiscounts = fixture.getAppliedDiscounts(
        [ getMugProductMock(2) ],
        getDiscountsMock()
      );
      expect(appliedDiscounts[0].title).toBe('2x1 Mug offer');
      expect(appliedDiscounts[0].count).toBe(1);
    });
    it('should return two "Mug" discounts when called with products count that can benefit from two "Mug" discounts', () => {
      const appliedDiscounts = fixture.getAppliedDiscounts(
        [ getMugProductMock(4) ],
        getDiscountsMock()
      );
      expect(appliedDiscounts[0].title).toBe('2x1 Mug offer');
      expect(appliedDiscounts[0].count).toBe(2);
    });
  });

  describe('total()', () => {
    it('should return 0 when called without arguments', () => {
      expect(fixture.total()).toBe(0);
    });
    it('should return 5 when called with products that can benefit from one "Mug" discount', () => {
      expect(fixture.total([
        getAppliedMugDiscountMock()
      ])).toBe(5);
    });
  });

});