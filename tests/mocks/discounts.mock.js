export const getDiscountsMock = () => [
  {
    title: '2x1 Mug offer',
    amount: { value: 5, symbol: '€' },
    conditions: [
      { productTitle: 'Mug', count: 2 }
    ],
  },
  {
    title: 'x3 Shirt offer',
    amount: { value: 3, symbol: '€' },
    conditions: [
      { productTitle: 'Shirt', count: 3 }
    ]
  }
];

export const getMugDiscountMock = () => ({
  title: '2x1 Mug offer',
  amount: { value: 5, symbol: '€' },
  conditions: [
    { productTitle: 'Mug', count: 2 }
  ]
});

export const getAppliedMugDiscountMock = () => ({
  title: '2x1 Mug offer',
  amount: { value: 5, symbol: '€' },
  conditions: [
    { productTitle: 'Mug', count: 2 }
  ],
  count: 1
})